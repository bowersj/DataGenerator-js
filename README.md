# Data Generator
Generate sample data with ease and efficiency.

## Purpose

Ever need complex real world like data that even involves content and other types?

I have, and that is why this library exists. Now in all fairness this library wont be the fastest out there because,
 well, it is written in javascript and uses [node.js](https://nodejs.org/en/) as its environment. But it will easy 
 to use, take advantage of fast and multi-threaded environments through using the cluster module, more on that latter. 
 So, how does it work? What do I need to do to make this thing generate some data?


## Performance
Generating a 100 records is easy, generating 100 million records in a timely manor is not. You care about those extra 
milliseconds taken by the more readable code. So as a result, the code is definitely more imperative and less logical.
But, with that set aside, there are a few interesting cases I came across as I was coding the data generator functions.

### Insights
1) __Hard coding everything does not guarantee better performance in JS__. See the 
[`fakeCreditCard.js`](src/tests/fakeCreditCard.js) 
for details. This surprised me, hard coding it should result in less overhead and therefore better efficiency but it 
doesn't. There could be many reasons, one of which could be a faulty test but assuming my test is not faulty, this is
a weird result, so what can we learn from it? The V8 engine has multiple steps when it comes to compiling and
optimizing your code, yes it optimizes your code for you! So that alone makes things complicated and I think that is 
the reason why my hard coded function is slower. If you take a look at my `_getVisa` function you will see that the 
for loop always runs 14 times. So, the compiler might be smart enough to catch that and convert that to an internal 
version where there is no for loop! This would explain why it is getting slightly better results. So main take away
here is, __V8 optimizes your code for you__, so __don't over complicate your code__ because the more complicated it
gets its less likely that the compiler can optimize your code. Note, the 
[() around the functions tells V8 to compile that function asap!](https://v8.dev/blog/code-caching-for-devs#iife).