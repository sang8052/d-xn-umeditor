<?php 
//
// 此demo 文件中 php 后端未对上传文件的类型做严格限制，存在严重安全隐患，仅供测试使用。请勿用于生产环境！
//
session_start();
if(!file_exists("upload")) mkdir("upload");

switch ($_GET["type"]) {
	case 'image': SaveBase64Img($_POST["data"]);break;
	case "file" : SaveBinaryFile(); break;
	default:break;
}

function SaveBinaryFile()
{

	$filename = $_FILES["smfile"]["name"];
	$filetype = GetFileType($filename);
	$filepath = "upload/".randstr(32).".".$filetype;
	move_uploaded_file($_FILES["smfile"]["tmp_name"], $filepath);
	$rjson["code"] = "success";
	$rjson["success"] = true;
	$rjson["message"] = "Upload success";
	if($_POST["file_id"]!="") $_POST["fileId"] =$_POST["file_id"]; 
	$rjson["data"]["file_id"] = $_POST["fileId"];
	$rjson["data"]["filepath"] = $filepath;
	$rjson["data"]["filename"] = $filename;
	$rjson["data"]["filesize"] = filesize($filepath);
	$rjson["data"]["filetype"] = $_FILES["smfile"]["type"];
	$rjson["data"]["filesuffix"] = $filetype;
	$rjson["data"]["hash"] = hash_file('md5', $filepath);
	$rjson["data"]["fileload"] = false;
	$rjson["requestid"] = GetRequestID();
	
	echo json_encode($rjson);
}

function SaveBase64Img($base64)
{
   	$filename = "upload/".randstr(32).".png";
   	$image = explode(",",$base64)[1];
   	file_put_contents(	$filename , base64_decode($image));
    
    // 按照 xiuno 的接口规范 返回json
    $mes["url"]=$filename;
   	$mes["orgfilename"] = "image.png";
   	$mes["filetype"] = "image";
   	$mes["fileszie"] = filesize($filename);
   	$mes["width"] = $_POST["width"];
   	$mes["height"] = $_POST["height"];
   	$mes["is_image"] = 1;
   	$mes["downloads"] = 0;
   	$mes["aid"] = "_0";
   	
   	$rjson["code"] = "0";
   	$rjson["message"]=$mes;
   	echo json_encode($rjson);
}


function GetFileType($file)
{
	$f= explode(".",$file);
	$i = count($f);
	return $f[$i-1];
}


function GetRequestID()
{
	$request = hash("sha256",time().json_encode($_GET).json_encode($_POST).json_encode($_COOKIE).json_encode($_SESSION));
	$request = strtoupper($request);
	$result = "";
	for($i=1;$i<=64;$i++)
	{
		$result .= $request[$i-1];
		if($i%8==0 && $i!=64) $result .="-";
	}
	return $result;
}

function randstr($length=32)
{
	 $str = null;
     $strPol = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
     $max = strlen($strPol)-1;
     
      for($i=0;$i<$length;$i++)
      {
        $str.=$strPol[rand(0,$max)];
      }
      return $str;
}
?>