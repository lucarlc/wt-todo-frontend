import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import TodoList from '../TodoList.vue'

function mockFetch(handlers: (url: string, options?: any) => any) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input)
      return handlers(url, init)
    }),
  )
}

describe('TodoList', () => {
  beforeEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders todos from GET', async () => {
    mockFetch(async () => {
      return {
        ok: true,
        status: 200,
        json: async () => [{ id: 1, title: 'Test', done: false }],
      }
    })

    const wrapper = mount(TodoList)
    await flushPromises()

    expect(wrapper.text()).toContain('Test')
  })

  it('creates a todo via POST and shows it in the list', async () => {
    mockFetch(async (_url, init) => {
      const method = init?.method || 'GET'

      if (method === 'GET') {
        return { ok: true, status: 200, json: async () => [] }
      }

      if (method === 'POST') {
        const body = JSON.parse(String(init?.body))
        expect(body.title).toBe('Neu')

        return { ok: true, status: 201, json: async () => ({ id: 2, title: 'Neu', done: false }) }
      }

      throw new Error(`Unhandled ${method}`)
    })

    const wrapper = mount(TodoList)
    await flushPromises()

    const input = wrapper.find('input[placeholder="Neues Todo"]')
    await input.setValue('Neu')

    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.text()).toContain('Neu')
  })
})
