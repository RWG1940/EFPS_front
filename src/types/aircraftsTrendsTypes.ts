
export interface AircraftsTrendsData {
    id?: number;
    header?: string;
    content?: string;
    status?: number;
    theme?: string;
    author?: string;
    createtime?: string;
    updatetime?: string;
  }

export const aircraftsTrendADD_FORM_RULES = {
      header: [{ required: true, message: '标题必填' }],
      content: [{ required: true, message: '内容必填' }],
      theme: [{ required: true, message: '请选择主题' }],
      author: [{ required: true, message: '请输入作者' }],
      status: [{ required: true, message: '请选择状态' }],
  }

export const aircraftsTrendEDIT_FORM_RULES = {
      header: [{ required: true, message: '标题必填' }],
      content: [{ required: true, message: '内容必填' }],
      theme: [{ required: true, message: '请选择主题' }],
      author: [{ required: true, message: '请输入作者' }],
      status: [{ required: true, message: '请选择状态' }],
  }
export const aircraftsTrendThemeOptions = [
      { label: '严重', value: 'error' },
      { label: '通知', value: 'info' },
      { label: '警告', value: 'warning' },
      { label: '成功', value: 'success' },
  ]
export const aircraftsTrendStatusOptions = [
      { label: '已发布', value: 1 },
      { label: '审核中', value: 0 },
  ]