<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>fileList</title>
</head>
<body>
<ul>
    <#list files as file>
        <li><a href="http://127.0.0.1:8080/download?file=${file}">${file}</a></li>
    </#list>
</ul>
</body>
</html>