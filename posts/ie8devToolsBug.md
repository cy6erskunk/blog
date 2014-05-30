{
    title: 'Epic IE8 developer tools bug',
    date:   '2014-05-30',
    posturl: 'Epic IE8 developer tools bug'
}
## Epic IE8 developer tools bug

Today I was fixing another minor IE8-related bug, when I found a page, which was working
pretty fine but it was crashing IE when I tried to open devtools. I was trying to figure out what
was happening for a while but could not get anything: the page was working pretty good in
all browsers including IE8, but as soon as I tried to open its devtools, iexplore.exe
process was starting to grow up and browser crashed when it began to consume about 2Gb.

Several hours later I returned to that page and noticed that it was rendered a little bit
incorrecty in IE8. I looked through the html and found something like:

    <div><span>some text<span/></div>
    <div><span>some text<span/></div>
    <div><span>some text<span/></div>
    ...

It was really easy to fix, all I had to do was to close span properly:

    <div><span>some text</span></div>
    <div><span>some text</span></div>
    <div><span>some text</span></div>
    ...

And after reloading the page with a bunch of such a divs I noticed that it was rendered
slightly faster or maybe I wanted to notice it... So I tried to open devtools and voala:
everything was okay. 

Well, I decided to make a test page containing small number of such divs and check out
what IE going to do:

    <!DOCTYPE html>
    <html>
        <head>
        </head>
        <body>
            <div class="wrapper">
                <div><span>1<span/></div>
                <div><span>2<span/></div>
                <div><span>3<span/></div>
            </div>
        </body>
    </html>

And after opening devtools I found the problem: IE8 could not fix self-closed spans, so
HTML tab displayed nasty beast:

    <div class="wrapper">
     |-- <div>
          |--<span>
          |  |-- Text - 1
          |  |-- <span>
          |       |-- <div>
          |       |    |-- <span>
          |       |         |-- Text - 2
          |       |         |-- <span>
          |       |              |-- <div>
          |       |                   |-- <span>
          |       |                        |-- Text - 3
          |       |                        |-- <span/>
          |       |-- <div>
          |            |-- <span>
          |                 |-- Text - 3
          |                 |-- <span/>
          |-- <div>
          |    |-- <span>
          |         |-- Text - 2
          |         |-- <span>
          |              |-- <div>
          |                   |-- <span>
          |                        |-- Text - 3
          |                        |-- <span/>
          |-- <div>
                  |-- <span>
                       |-- Text - 3
                       |-- <span/>

It seems like IE8 created cross-links, because when selecting nodes fron HTML tab it
performed in following manner: select span with `1` inside it - all contents of wrapper
block get highlighted, select span with `2` text content (does not matter which one - all
contents except to first line get highlighted) etc.

However `document.querySelectorAll('div').length` was equal to 4, as expected, and page
source an Script tab was displayed correctly.

## TL;DR

IE8 developer tools cannot fix incorrectly closed tags when displaying tree structure of
document and creates some lind of cross-referenced tree of
subrees. It leads to very fast growth of node number to display in HTML tab (in
descried case number of nodes shown in HTNL inspector is O(2^n), where n is number of
improperly closed span tags (There was about 100 such elements inside single wrapped in
my case, so, yes, it is not that easy to display 10^30 nodes as I believe and if I were
IE8 I'd crash too...)


