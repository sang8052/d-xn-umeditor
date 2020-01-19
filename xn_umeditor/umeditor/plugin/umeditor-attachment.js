UM.registerUI('attachment',
            function (name) {
                var me = this;
                var $btn = $.eduibutton({
                    icon: 'attachment',
                    click: function () {
                        var layIndex = layer.open({
                            type: 2,
                            title: '附件',
                            maxmin: false,
                            shadeClose: true, //点击遮罩关闭层
                            area: ['600px', '480px'],
                            content: 'xn_umeditor/umeditor/dialogs/attachment/index.html?upload_attachment='+window.btoa(me.options.upload_attachment),
                            btn: ['确定', '取消'],
                            btn1: function (index) {
                            	len = file_attachment.length;
                            	for(var i=0;i<len;i++)
                            	{
                            		var file = file_attachment[i];
                            		if(!file.fileload)
                            		{
                            			 var html = '<div class="card" style="margin-bottom:5px;padding:0px;">';
                                         html += '<div class="col-lg-12" style = "margin-top:10px;padding-left: 0px;">';
                                         html += '<div class="col-lg-3" style="width:55px;">';
                                         html += '<img src="xn_umeditor/umeditor/dialogs/attachment/download.png" />';
                                         html += '</div>';
                                         html += '<div class="col-lg-8">';
                                         html += '<div class="row">';
                                         html +=  "附件["+(i+1)+"]:"+file.filename;
                                         html += '</div>';
                                
                                         html += '</div>';
                                         html += '<div class="col-sm-1">';
                                         html += '<a href="' + file.filepath + '"  _href="' + file.filepath + '" class="btn btn-link"  target="_blank"> <i class="icon icon-download-alt icon-2x"></i></a>';
                                         html += '</div>';
                                         html += '</div>';
                                         html += '</div>';
                                         me.execCommand('insertHtml', html);
                                         file_attachment[i].fileload = true;
                            		}
                            	}
 
                            
                                //关闭当前弹窗
                                layer.close(layIndex);
                            },
                            btn2: function (index) {
                                //关闭当前弹窗 
                                layer.close(layIndex);
                            }
                        });
                    },
                    title: '附件'
                });
 
                me.addListener('selectionchange', function () {
                    //切换为不可编辑时，把自己变灰
                    var state = this.queryCommandState(name);
                    $btn.edui().disabled(state == -1).active(state == 1)
                });
                return $btn;
});
            
 UM.plugins['xnimg'] = function() {};
            
            