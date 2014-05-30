{
    title: 'Strange issues with X-UA-Compatible',
    date:   '2014-05-30',
    posturl: 'Strange issues with X-UA-Compatible'
}
## X-UA-Compatible? NO!!!!....

There is quite simple way to tell IE to switch to older version compatibility mode - it
is META tag (or header). MSDN describes this approach in the following  [article](http://msdn.microsoft.com/en-us/library/jj676915(v=vs.85).aspx).

There is a way to specify multiple content attribute values, described in corresponding section of the document.

However there is some strange issue with IE8: if we add

    <meta http-equiv="x-ua-compatible" content="IE=7,edge"/>
or

    <meta http-equiv="x-ua-compatible" content="IE=7,IE=edge"/>

into the `<head>` of the page, IE8 switches to IE7 mode but more recent versions of IE do not switch to compatibility mode.

This behaviour is a bit strange, because IE8 could use `edge` value and act as IE8, but...

That's not all! 

If we change `IE=7` to `IE=8`, none of IE8+ browsers switch to compatibility mode. Hmmm...

It leads us to the following idea: IE8 does not understand several values and uses the very first one instead (`<meta http-equiv="x-ua-compatible" content="IE=6,7,edge"/>` switches IE8 in quirks mode, as if `<meta http-equiv="x-ua-compatible" content="IE=6"/>` was provided). 
