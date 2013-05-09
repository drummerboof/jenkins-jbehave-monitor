(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['recent'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <tr>\n                <td>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</td>\n            </tr>\n        ";
  return buffer;
  }

  buffer += "<h2>\n    ";
  if (stack1 = helpers.count) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.count; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " New Failures\n    <small>Failed in build ";
  if (stack1 = helpers.latest) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.latest; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + " and not the previous build</small>\n</h2>\n<table class=\"table table-bordered table-hover table-striped\">\n    <tbody>\n        ";
  stack1 = helpers.each.call(depth0, depth0.failures, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n</table>";
  return buffer;
  });
templates['summary'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"alert alert-info clearfix\" style=\"padding-right: 14px;\">\n    <h4 class=\"pull-left\">Build: ";
  if (stack1 = helpers.number) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.number; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h4>\n    <h4 class=\"pull-right\">Failed: "
    + escapeExpression(((stack1 = ((stack1 = depth0.failedJBehaves),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h4>\n</div>\n\n";
  return buffer;
  });
templates['test'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n        <span class=\"label label-important\">Last Build</span>\n    ";
  }

  buffer += "<td class=\"test-name\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td class=\"test-recent\">\n    ";
  if (stack1 = helpers.mostRecent) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.mostRecent; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n    ";
  stack1 = helpers['if'].call(depth0, depth0.failedOnLastBuild, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</td>\n<td class=\"test-count\">";
  if (stack1 = helpers.count) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.count; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n<td class=\"test-rate\">";
  if (stack1 = helpers.rate) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.rate; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "%</td>\n<td class=\"test-score\">";
  if (stack1 = helpers.score) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.score; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n";
  return buffer;
  });
templates['tests'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<h2>Test Summary</h2>\n<table id=\"FailedTests\" class=\"table table-bordered table-hover table-striped\">\n    <thead>\n        <tr>\n            <th data-sort=\"name\">Test</th>\n            <th data-sort=\"mostRecent\">Most Recent Failure</th>\n            <th data-sort=\"count\">Failure Count</th>\n            <th data-sort=\"rate\">Failure Rate</th>\n            <th data-sort=\"score\">Failure Score</th>\n        </tr>\n    </thead>\n    <tbody>\n\n    </tbody>\n</table>";
  });
})();