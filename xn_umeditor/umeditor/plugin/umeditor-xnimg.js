
	UM.registerUI('xnimg', function( name ){
		var me = this;
		var $btn = $.eduibutton({
			icon: name,
			title: '插入图片',
			html: '<input type="file" value="" name="file" accept="image/*"  multiple="multiple" />', 
			click: function(e) {
				//console.log(e);
			}
		});
		
		// 对图片进行缩略
		$btn.find('input[type="file"]').on('change', function(e) {
			var files = xn.get_files_from_event(e);
			if(!files) return;
			// 并发下会 服务端 session 写入会有问题，由客户端控制改为串行
			$.each_sync(files, function(i, callback) {
				var file = files[i];
				//xn.upload_file(file, xn.url('attach-create'), {is_image: 1}, function(code, json) {
				xn.upload_file(file, me.options.upload_xnimg, {is_image: 1, filetype: 'jpg'}, function(code, json) {
					if(code == 0) {
						if(json.width > 800) {
							var scale = json.height / json.width;
							json.width = 800;
							json.height = xn.intval(800 * scale);
							var s = '<a href="'+json.url+'" target="_blank"><img src="'+json.url+'" width="'+json.width+'" height=\"'+json.height+'\" /></a><br>';
						} else {
							var s = '<img src="'+json.url+'" width="'+json.width+'" height=\"'+json.height+'\" />';
						}
						me.execCommand('inserthtml', s);
					} else {
						$.alert(json);
					}
					callback();
				});
			});
		});
		
		me.addListener('selectionchange', function () {
			var state = this.queryCommandState(name);
			$btn.edui().disabled(state == -1).active(state == 1);
		});
	
		return $btn;
	});
	
	
	UM.plugins['xnimg'] = function() {};
	