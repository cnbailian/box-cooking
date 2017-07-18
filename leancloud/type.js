// 类型
export default function(Vue)
{
	const type = [{
		value: 'img',
		name: '图像'
	}, {
		value: 'text',
		name: '文本'
	}, {
		value: 'link',
		name: '网页'
	}]
	const tagType = [{
		value: '',
		label: '默认'
	}, {
		value: 'primary',
		label: 'primary'
	}, {
		value: 'gray',
		label: 'gray'
	}, {
		value: 'success',
		label: 'success'
	}, {
		value: 'warning',
		label: 'warning'
	}, {
		value: 'anger',
		label: 'anger'
	}]
	Vue.prototype.typeList = type
	Vue.prototype.tagTypeList = tagType
}
