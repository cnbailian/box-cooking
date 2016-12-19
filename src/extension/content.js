var config = {
	// 默认为空的link
	type: 'link',
	content: ''
}
/*与background通讯*/
window.onmouseup = function(e){
		if (e.button == 2) {
			/*获取当前选中文本*/
			var selection = window.getSelection().toString();
			/*转为jQery元素*/
			var _this = jQuery(e.srcElement);
			/*获取背景图片*/
			var bg = _this.css('background-image');
			switch(true)
			{
				// 获取选中文本
				case (selection !== ''):
					config.type = 'text';
					config.content = selection;
					break;
				// 获取图片
				case (_this.prop("tagName") == "IMG"):
					config.type = 'img';
					config.content = _this[0].src;
					break;
				// 获取背景图片
				case (bg != 'none'):
					config.type = 'img';
					config.content = bg.replace('url(','').replace(')','').replace(/\"/gi, "");
					break;
				// 获取链接地址
				case (_this.prop("tagName") == 'A'):
					config.type = 'link';
					config.content = _this.attr('href');
					break;
				/*默认当前页面url*/
				default:
					config.type = 'link';
					config.content = window.location.href;
			}
			chrome.runtime.sendMessage(config);
		}
}
