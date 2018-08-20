/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
    // Define changes to default configuration here.
    // For complete reference see:
    // http://docs.ckeditor.com/#!/api/CKEDITOR.config
    config.toolbarGroups = [
        { name: 'insert', groups: [ 'simage', 'youtube', 'insert' ] },
        { name: 'document', groups: [ 'mode', 'doctools', 'document' ] },
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { name: 'forms', groups: [ 'forms' ] },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
        { name: 'links', groups: [ 'links' ] },
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'colors', groups: [ 'colors' ] },
        { name: 'tools', groups: [ 'tools' ] },
        { name: 'others', groups: [ 'others' ] },
        { name: 'about', groups: [ 'about' ] }
    ];

    config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Anchor,Underline,Strike,Subscript,Superscript,Italic,Bold,Indent,Outdent,NumberedList,BulletedList,Link,Unlink,About,Source';


    // Dialog windows are also simplified.
    config.removeDialogTabs = 'link:advanced';

    config.toolbarLocation = 'bottom';
    config.uiColor = '#f8f8f8';
    config.placeholder = 'some vasdfsadfalue';

    config.extraPlugins = 'simage,youtube,sourcearea,autogrow,confighelper';
    config.autoGrow_minHeight = 250;
    config.height = 250;
    //config.autoGrow_maxHeight = 600;
    //Writer___________K__180622 자동 증가폭
    config.autoGrow_bottomSpace = 110;


    config.youtube_width = '646';
    config.youtube_height = '480';
    // config.youtube_responsive = false;
    // config.youtube_related = false;
    // config.youtube_older = false;
    //config.youtube_controls = true;
    //config.youtube_noembed = true;
    //config.youtube_privacy = false;
    //config.youtube_autoplay = true;
    //config.youtube_disabled_fields = ['txtEmbed', 'chkAutoplay'];
    //config.youtube_disabled_fields = ['chkAutoplay'];

    //Writer___________K__180622 이미지 업로드 url
    config.imageUploadURL = "/ajax/registerPicture";

    config.dataParser =  function(data) {
    	console.log(data) ;
    	return "/img/" + data.name;
    }
}