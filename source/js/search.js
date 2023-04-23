var searchFunc = function(path, search_id, content_id) {
    'use strict';
    $.ajax({
        url: path,
        dataType: "xml",
        success: function( xmlResponse ) {
            var datas = $( "entry", xmlResponse ).map(function() {
                return {
                    title: $( "title", this ).text(),
                    content: $("content",this).text(),
                    url: $( "url" , this).text()
                };
            }).get();
            const dropdownMenu = document.querySelector('.dropdown-menu');
            const searchResponseNull = document.querySelector('.search-response-null');
            var $input = document.getElementById(search_id);
			if (!$input) return;
            var $resultContent = document.getElementById(content_id);
            if ($("#local-search-input").length > 0) {
                $input.addEventListener('input', function () {
                    const isExist = this.value.trim()
                    if (isExist) dropdownMenu.classList.add('top_ac')
                    var str = '<ul class=\"search-result-list\">';
                    var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
                    $resultContent.innerHTML = "";
                    if (this.value.trim().length <= 0) {
                        dropdownMenu.classList.remove('top_ac')
                        return;
                    }
                    datas.forEach(function (data) {
                        var isMatch = true;
                        var content_index = [];
                        if (!data.title || data.title.trim() === '') {
                            data.title = "Untitled";
                        }
                        var data_title = data.title.trim();
                        var data_content = data.content.trim().replace(/<[^>]+>/g, "").toLowerCase();
                        var data_url = data.url;
                        var index_title = -1;
                        var index_content = -1;
                        var first_occur = -1;
                        if (data_content !== '') {
                            keywords.forEach(function (keyword, i) {
                                index_title = data_title.indexOf(keyword);
                                index_content = data_content.indexOf(keyword);

                                if (index_title < 0 && index_content < 0) {
                                    isMatch = false;
                                } else {
                                    if (index_content < 0) {
                                        index_content = 0;
                                    }
                                    if (i == 0) {
                                        first_occur = index_content;
                                    }
                                }
                            });
                        } else {
                            isMatch = false;
                        }
                        if (isMatch) {
                            str += "<li><a href='" + data_url + "' class='search-result-title'>" + data_title + "</a>";
                            var content = data.content.trim().replace(/<[^>]+>/g, "");
                            if (first_occur >= 0) {
                                var start = first_occur - 20;
                                var end = first_occur + 80;

                                if (start < 0) {
                                    start = 0;
                                }

                                if (start == 0) {
                                    end = 100;
                                }

                                if (end > content.length) {
                                    end = content.length;
                                }

                                var match_content = content.substring(start, end);

                                keywords.forEach(function (keyword) {
                                    var regS = new RegExp(keyword, "gi");
                                    match_content = match_content.replace(regS, "<em class=\"search-keyword\">" + keyword + "</em>");
                                });

                                str += "<p class=\"search-result\">" + match_content + "...</p>"
                            }
                            str += "</li>";
                        }
                    });
                    str += "</ul>";
                    if (str.includes('<li>')) {
                        searchResponseNull.classList.add('hide')
                    } else {
                        searchResponseNull.classList.remove('hide')
                    }
                    $resultContent.innerHTML = str;
                });
            }
        }
    });
}