/**
 * Created with JetBrains WebStorm.
 * User: sonofrei
 * Date: 11/7/13
 * Time: 4:01 PM
 * To change this template use File | Settings | File Templates.
 */
var getQueryTouchpoint = function (rules,tp)
{



    if (rules.length > 0 && !isEmptyObject( tp))
    {
        //var j = JSON.parse('{"$or":[{"r3":1},{"r3":{"$exists":false}}],"r1":1}');
        var strFind = '{"$and":[';



        for(var i=0;i<rules.length;i++)
        {

          var rule = rules[i]  ;
         // console.log('%j',rule);
          if(rule.type =='single')
          {

           //console.log(rule.attribute);
           var x =    getByPath(tp,rule.attribute);
           if (x)
           {
               console.log(rule.attribute);
               if(typeof (x) == 'number')
               {
                   switch (rule.operator)
                   {
                       case '=':
                        strFind = strFind + '{"$or":[{"ruleSet.' + rule.attribute +'":' + x + '},{"ruleSet.' + rule.attribute + '":{"$exists":false}}]},';
                   break;
                       case '<':
                           strFind = strFind + '{"$or":[{"ruleSet.' + rule.attribute +'":{"$lt":' + x + '}},{"ruleSet.' + rule.attribute + '":{"$exists":false}}]},';
                   break
                       case '>':
                           strFind = strFind + '{"$or":[{"ruleSet.' + rule.attribute +'":{"$gt":' + x + '}},{"ruleSet.' + rule.attribute + '":{"$exists":false}}]},';
                  }
               }
               else
               {
                   strFind = strFind + '{"$or":[{"ruleSet.' + rule.attribute +'":"' + x + '"},{"ruleSet.' + rule.attribute + '":{"$exists":false}}]},';
               }


           }
              else
           {
             strFind = strFind + '{"ruleSet.' + rule.attribute + '":{"$exists":false}},';
           }
        //   console.log(strFind);

          }
          if (rule.type ==  'single_parent_array_of_objects')
          {

              // only implement = operator on string value. enough po POC
              var parent =   getByPath(tp,rule.arrayAttribute);



              strFind = strFind + '{"$or":['
              if (parent)
              {
              for (var j = 0;j<parent.length;j++)
              {

                var  val = getByPath(parent[j],rule.attribute);
               strFind = strFind + '{"ruleSet.' + rule.arrayAttribute.replace(".","_") + '_' + rule.attribute +'":"' + val + '"},';

              }
              }

              strFind =  strFind +  '{"ruleSet.' +  rule.arrayAttribute.replace(".","_") + '_' + rule.attribute + '":{"$exists":false}}]},'


          }

        }


        strFind =  strFind.substring(0, strFind.length - 1);
        strFind = strFind + ']}';

        console.log('strFind:%s',strFind)      ;

        var jsonFind = JSON.parse(strFind);


       //console.log('jsonFind1:%s',JSON.stringify(jsonFind));
        return jsonFind;

    }
    return 'not valid';

}
exports.getQueryTouchpoint = getQueryTouchpoint;

var isEmptyObject = function (obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}

var getByPath = function(data,path)
{
    try
    {
    return eval("data." + path);
    }
    catch (e)
    {
     return null;
    }

}