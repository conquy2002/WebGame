<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Khảo sát sinh viên</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
</head>
<style type="text/css">
	.form-front{
		margin-top: 50px;
		padding: 50px;
	}
</style>
<body>
<div class="container">
	<div class="form-front">
		<div class="card">
		  <div class="card-header bg-success text-light">
		  	Bảng khảo sát sinh viên
		  </div>
		  <div class="card-body">
		  	<form method="post" id="MyForm" >

		  		<div class="form-group group-username">
			  		<label for="username">User Name:</label>
			  		<input required="true" type="text" name="user" id="username" class="form-control">
			  	</div>
			  	<div class="form-group group-fullname">
			  		<label for="email">Email:</label>
			  		<input required="true" type="email" name="email" id="email" class="form-control">
			  	</div>
			  	<div class="form-group">
			  		<label for="Phone">Phone:</label>
			  		<input type="text" name="phone" id="Phone" class="form-control">
			  	</div>
			  	<div class="form-group">
			  		<label for="text">Text:</label>
			  		<input required="true" type="text" name="text" id="text" class="form-control">
			  	</div>
			  	<button type="submit" class="btn btn-success" id="btn_save">Send</button>
		  	</form>
		  </div>
		</div>
	</div>
</div>
</body>
<script type="text/javascript">
   $(document).ready(function()
   { 
      var submit = $("button[type='submit']");

      submit.click(function()
      {
        
        var name = $("input[name='user']").val(); 
 		var phone = $("input[name='phone']").val();
 		var email =  $("input[name='email']").val();
 		var text = $("input[name='text']").val();
       
 
        
        var data = $('form#form_input').serialize();
      
       
        $.ajax({
              type : 'post', 
              url : '/send',
              data : data, //dữ liệu sẽ được gửi
              success : function(data)  
                { 
                   if(data == 'false') 
                   {
                     alert('Lỗi');
                   }else{
                     alert('Gửi phản hồi thành công');
                   }
                }
              });
              return false;
        });
    });
</script>
</html>