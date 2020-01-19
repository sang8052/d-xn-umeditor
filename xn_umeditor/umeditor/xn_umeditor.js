$(function() {
	
	
	
	var um = UM.getEditor(umconfig["content_dom"], {
	    lang:/^zh/.test(navigator.language || navigator.browserLanguage || navigator.userLanguage) ? 'zh-cn' : 'en',
	    langPath:UMEDITOR_CONFIG.UMEDITOR_HOME_URL + "lang/",
	    focus: true
	});
	
	um.ready(function() {
		
		// 如果浏览器不支持，直接返回。
		if(!window.FormData || !window.FileReader)  return;
		
		var me = this;
		var xn_upload_handler = function(e) {
			var files = e.type == 'paste' ? get_paste_image(e.originalEvent) : get_drop_image(e.originalEvent);
			if(!files) return;
			$.each_sync(files, function(i, callback) {
				var file = files[i];
				if(file.getAsFile) file = file.getAsFile();
				if(!file || file.size == 0 || file.type.indexOf('image') == -1) return;
				var jimg = null;
				var jprogress = null;
				xn.upload_file(file, me.options.upload_url, {is_image: 1, filetype: 'jpg'}, function(code, json) {
					if(code == 0) {
						setTimeout(function() {
							if(jimg) jimg.remove();
						}, 300);
						var s = '<img src="'+json.url+'" width="'+json.width+'" height=\"'+json.height+'\" />';
						me.execCommand('inserthtml', s);
					} else {
						console.log(json);
					}
					callback();
				}, function(percent) {
					if(jprogress) jprogress.val(percent);
					//console.log(percent);
				}, function(data) {
					var imgid = xn.rand(16);
					var progressid = xn.rand(16);
					me.execCommand('inserthtml', '<div style="width: 100px; height: 100px; position: relative; display: inline-block;" class="'+imgid+'"><img src="'+data+'" width="100" height=\"100\" data-keep-src="1" /><progress class="progress progress-success '+progressid+'" value="1" max="100" style="width: 90px; height: 10px; position: absolute; left: 5px; top: 45px;">0%</progress>');
				
					setTimeout(function() {
						jimg = $('.'+imgid);
						jprogress = $('.'+progressid);
					}, 200);
				});
			});
		}
		function get_paste_image(e) {
			return e.clipboardData && e.clipboardData.items && e.clipboardData.items.length == 1 && /^image\//.test(e.clipboardData.items[0].type) ? e.clipboardData.items : null;
		}
		function get_drop_image(e) {
			return e.dataTransfer && e.dataTransfer.files ? e.dataTransfer.files : null;
		}
		me.getOpt('pasteImageEnabled') && me.$body.on('paste', xn_upload_handler);
		me.getOpt('dropFileEnabled') && me.$body.on('drop', xn_upload_handler);
		
		var xn_paster_after_handler = function(e) {
			me.$body.find('img').each(function() {
				var jthis = $(this);
				var src = jthis.attr('src');
				if(jthis.data('keep-src')) return;
				if(src && xn.substr(src, 0, 10) == 'data:image') {
					
					// 如果发现有图片，则清理格式
					// 对黑色背景的图片，进行透明化处理
					xn.upload_file(src, me.options.upload_url, {is_image: 1, filetype: 'jpg'}, function(code, json) {
						if(code == 0) {
							jthis.attr('src', json.url);
							var node = jthis.closest('span').get(0);
							 if(node && node.getAttributeNode && node.getAttributeNode('style') && node.removeAttributeNode) {
					                    	node.removeAttributeNode(node.getAttributeNode('style'));
					                  }
						} else {
							$.alert(json);
						}
					});
				}
			});
		}
		
		
	
		me.addListener('afterpaste', xn_paster_after_handler);

		// 小屏幕下隐藏一些工具
		var jtoolbar = me.$container.find('.edui-btn-toolbar');
		jtoolbar.children().not('.edui-btn-name-paragraph,.edui-btn-xnimg,.edui-splitbutton-forecolor,.edui-btn-link,.edui-btn-unlink,.edui-btn-name-insertcode,.edui-btn-emotion,.edui-btn-video').addClass('hidden-sm hidden-md');
	
	});
	
	
});
