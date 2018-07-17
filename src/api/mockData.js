import Mock from "mockjs";
import apiUrl from "../../config/api-url.json";

Mock.setup({
  timeout: '100 - 350'
})

Mock.mock(apiUrl.index, Object.assign({}, {
  'banner|4': [{
    'id|+1': 1,
    title: '@cname',
    url: Mock.Random.domain(),
    img: Mock.Random.image('1900x360', Mock.Random.color())
  }],
  'user|1': {name: '@cname'}
}));

Mock.mock(apiUrl.list, Object.assign({}, {
  'list|10': [{
    'id|+1': 1,
    title: '@cname',
    createTime: '@date("yyyy-MM-dd")',
    description: '@cparagraph'
  }]
}));

Mock.mock(apiUrl.details, Object.assign({}, {
  project: { 'id|+1': 1, title: '@cname', createTime: '@date("yyyy-MM-dd")', description: '@cparagraph' }
}));

export default Mock;