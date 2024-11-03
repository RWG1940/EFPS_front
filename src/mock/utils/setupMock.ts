import Mock from 'mockjs'

export default function setupMock() {
  Mock.setup({
    timeout: '50-100'
  })
}
