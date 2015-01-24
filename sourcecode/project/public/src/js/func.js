var apiUser		= "gabi",
	apiPwd		= "par0la",
	apiBase = window.location.protocol + "//" + apiUser + ":" + apiPwd + "@" + window.location.host + "/api/";

/** AJAX processes */
function addArticle() {
	var data = $("#add-article").serialize();
	$.ajax({
          url: apiBase + "articles?" + Math.random(),
          method: "POST",
          data: data,
          success: function(data) {
            if(data) {
              alert("Item added!");
            } else {
              alert("There was an error. Please check logs!");
            }
            showArticles();
          }
    });
}

function getArticles() {
	var articles = null;
	$.ajax({
		url: apiBase + "articles?" + Math.random(),
		async: false,
		success: function(data) {
			articles = data;
		}
	});

	return articles;
}

function getArticle(id) {
	var article = null;
	$.ajax({
		url: apiBase + "articles/" + id + "?" + Math.random(),
		async: false,
		success: function(data) {
			article = data;
		}
	});

	return article;
}

function modifyArticle() {
	var data = $("#modify-article").serialize();
	$.ajax({
          url: apiBase + "articles?" + Math.random(),
          method: "PUT",
          data: data,
          success: function(data) {
            if(data) {
              alert("Item edited!");
            } else {
              alert("There was an error. Please check logs!");
            }
            showArticle($("#modify-article").children()[0].value);
          }
    });
}

function deleteArticle(id) {
	$.ajax({
          url: apiBase + "articles/" + id + "?" + Math.random(),
          method: "DELETE",
          success: function(data) {
            if(data.success) {
              alert("Item deleted!");
            } else {
              alert("There was an error. Please check logs!");
            }
            showArticles();
          }
    });
}

/** Page processes */
function showAddForm() {
	clearMainBody();

	var form = "<h1>Add article</h1>";
	form += "<form id=\"add-article\" class=\"form-horizontal\" action=\"#\">";
	form += "        <div class=\"form-group\">";
	form += "          <label for=\"title\" class=\"col-sm-2 control-label\">Title<\/label>";
	form += "          <div class=\"col-sm-10\">";
	form += "            <input type=\"text\" class=\"form-control\" name=\"title\" id=\"title\" placeholder=\"title...\">";
	form += "          <\/div>";
	form += "        <\/div>";
	form += "        <div class=\"form-group\">";
	form += "          <label for=\"body\" class=\"col-sm-2 control-label\">Body<\/label>";
	form += "          <div class=\"col-sm-10\">";
	form += "            <textarea id=\"body\" class=\"form-control\" name=\"body\"><\/textarea>";
	form += "          <\/div>";
	form += "        <\/div>";
	form += "";
	form += "        <div class=\"form-group\">";
	form += "          <label for=\"excerpt\" class=\"col-sm-2 control-label\">Excerpt<\/label>";
	form += "          <div class=\"col-sm-10\">";
	form += "            <textarea id=\"excerpt\" class=\"form-control\" name=\"excerpt\"><\/textarea>";
	form += "          <\/div>";
	form += "        <\/div>";
	form += "";
	form += "        <div class=\"form-group\">";
	form += "          <div class=\"col-sm-offset-2 col-sm-10\">";
	form += "            <button type=\"submit\" onclick=\"addArticle(); return false;\" class=\"btn btn-default\">Send<\/button>";
	form += "          <\/div>";
	form += "        <\/div>";
	form += "      <\/form>";
	form += "    <\/div>";

	appendMainBody(form);
}

function showEditForm(id) {
	clearMainBody();
	var article = getArticle(id);
	var form = "<h1>Edit article</h1>";
	if(article) {
		form += "<form id=\"modify-article\" class=\"form-horizontal\" action=\"#\">";
		form += "<input type='hidden' name='id' value='" + article._id + "' />";
		form += "        <div class=\"form-group\">";
		form += "          <label for=\"title\" class=\"col-sm-2 control-label\">Title<\/label>";
		form += "          <div class=\"col-sm-10\">";
		form += "            <input type=\"text\" class=\"form-control\" name=\"title\" id=\"title\" value=\"" + article.title + "\" placeholder=\"title...\">";
		form += "          <\/div>";
		form += "        <\/div>";
		form += "        <div class=\"form-group\">";
		form += "          <label for=\"body\" class=\"col-sm-2 control-label\">Body<\/label>";
		form += "          <div class=\"col-sm-10\">";
		form += "            <textarea id=\"body\" class=\"form-control\" name=\"body\">" + article.body + "<\/textarea>";
		form += "          <\/div>";
		form += "        <\/div>";
		form += "";
		form += "        <div class=\"form-group\">";
		form += "          <label for=\"excerpt\" class=\"col-sm-2 control-label\">Excerpt<\/label>";
		form += "          <div class=\"col-sm-10\">";
		form += "            <textarea id=\"excerpt\" class=\"form-control\" name=\"excerpt\">" + article.excerpt + "<\/textarea>";
		form += "          <\/div>";
		form += "        <\/div>";
		form += "";
		form += "        <div class=\"form-group\">";
		form += "          <div class=\"col-sm-offset-2 col-sm-10\">";
		form += "            <button type=\"submit\" onclick=\"modifyArticle(); return false;\" class=\"btn btn-default\">Send<\/button>";
		form += "          <\/div>";
		form += "        <\/div>";
		form += "      <\/form>";
		form += "    <\/div>";
	} else {
		form += '<div class="alert alert-info" role="alert">Unknown article</div>';
	}
	appendMainBody(form);
}

function showArticle(id) {
	clearMainBody();
	var article = getArticle(id);
	if(article) {
		content = "<h1>" + article.title + "</h1>";
		content += "<p><em>" + article.date + "</em></p>";
		content += "<div class='row'>"  + article.body + "</div>";
		content += '<div class="row">';
		content += "<button class=\"btn btn-primary\" onclick=\"showArticles()\" type=\"button\">Back</button>&nbsp;";
		content += "<button class=\"btn btn-primary btn-warning\" onclick=\"showEditForm('" + article._id + "')\" type=\"button\">Edit</button>&nbsp;";
		content += "<button class=\"btn btn-primary btn-danger\" onclick=\"deleteArticle('" + article._id + "')\" type=\"button\">Delete</button>";
		content += '</div>';
	} else {
		content += '<div class="alert alert-info" role="alert">Unknown article</div>';
	}
	appendMainBody(content);
}

function showHomeContent() {
	clearMainBody();

	var content = '<h1>App test - NodeJS w/ basic auth</h1>';	
	appendMainBody(content);

}

function showArticles() {
	clearMainBody();
	var articles = getArticles();
	var content = '<h1>Articles</h1>'
	if(articles.length) {
		var i = 0;
		for(var index in articles) {
			var article = articles[index];
			if(i == 0) {
				content += '<div class="row">';
			}
			++i;
			content += '<div class="col-sm-4">';
			content += '<h2>' + article.title + '</h2>';
			content += '<p>' + article.excerpt + '</p>';
			content += '<a href="#" onclick="showArticle(\'' + article._id + '\')">Read more</a>';
			content += '</div>'; 
			if(i == 3) {
				content += '</div>';
				i = 0;
			}
		}
	} else {
		content += '<div class="alert alert-info" role="alert">No articles</div>';
	}
	appendMainBody(content);
}

function clearMainBody() {
	$("#main-body").html('');
}

function appendMainBody(content) {
	$("#main-body").html(content);
}

function addActiveClass(current) {
	$('#navbar li').each(function(n) {
		$(this).removeClass('active');
	});
	$(current).addClass('active');
}

$(document).ready(function() {
	showHomeContent();

	/** Change navigation */
	$('#navbar li').click(function() {
		var action = $(this).attr('id');
		addActiveClass(this);

		switch(action) {
			case 'home' :
				showHomeContent();
				break;

			case 'articles' :
				showArticles();
				break;

			case 'add_article' :
				showAddForm();
				break;
		}
	})
});