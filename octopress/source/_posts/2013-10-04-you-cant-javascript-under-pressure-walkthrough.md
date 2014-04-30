---
title: "You Can\'t JavaScript Under Pressure walkthrough"
date: 2013-10-04
author: David
comments: true
layout: post
permalink: /2013/you-cant-javascript-under-pressure-walkthrough
categories:
  - javascript
---
A friend posted a link to this fun little quiz - [You Can't JavaScript Under Pressure][1].

The quizzes get more and more difficult, and they present a nice challenge if you fear your skills are getting rusty. Give it an honest try first, then come back here if you get seriously, honestly stuck. Try to do it yourself!

### Quiz 1: doubleInteger

#### Problem
    function doubleInteger(i) {
        // i will be an integer. Double it and return it.

        return i;
    }
{:lang="javascript"}

#### Solution
    function doubleInteger(i) {
        // i will be an integer. Double it and return it.
        
        return i * 2;
    }
{:lang="javascript"}

#### Explanation

Nothing tricky going on here. The prompt implies this should be done in two steps, but a one-liner works. We know i will always be an integer, so we don't need any sanitization checks, just a straight up return.

### Quiz 2: isNumberEven

#### Problem
    function isNumberEven(i) {
        // i will be an integer. Return true if it’s even, and false if it isn’t.
    }
{:lang="javascript"}

#### Solution
    function isNumberEven(i) {
        // i will be an integer. Return true if it’s even, and false if it isn’t.
        
        if(i % 2 === ) {
            //  no remainder, so it must be an even number
            return true;
        } else {
            //  remainder, so it must be odd.
            return false;
        }
    }
{:lang="javascript"}

#### Explanation

Again, no sanitization needed here because i is guaranteed to be an integer. The solution relies on an understanding of the modulus function - this is something usually learned in school, but something I haven't had to use since, except in interviews or quizzes. Or quizzes during interviews.

Basically, think of modulus as "remainder" function for division problems. For instance, ``4 % 2`` will give a modulus of ``1`` because 4 goes into 2 twice, evenly, with zero remainder. On the other hand, ``5 % 2`` will give a modulus of ``1`` because 5 goes into 2 twice, with a remainder of 1. This turns out to be a handy way to differentiate even (4) and odd (5) numbers.

(note that the ``else`` isn't needed here, but it gives greater clarity to what's going on)

### Quiz 3: getFileExtension

#### Problem
    function getFileExtension(i) {
        // i will be a string, but it may not have a file extension.
        // return the file extension (with no period) if it has one, otherwise false
    }
{:lang="javascript"}

#### Solution
    function getFileExtension(i) {
        // i will be a string, but it may not have a file extension.
        // return the file extension (with no period) if it has one, otherwise false

        var filenameArray = i.split(”.”);

        if(filenameArray.length <= 1) {
            //  i.e. “foo” becomes [“foo”] (array with 1 member)
            return false;
        } else {
            //  must be an array with more than 1 member.  The extension must be at the end.
            return filenameArray[filenameArray.length - 1];
        }
    }
{:lang="javascript"}

#### Explanation

Now we're getting a bit tougher!

Strings have a handy function that splits them into an array: ``split()``. For instance,

    "foo.bar.baz".split(".")
{:lang="javascript"}

will output

    ["foo", "bar", "baz"]
{:lang="javascript"}

Notice that the periods have been removed, just as the prompt asked for!

In this case we need to first check if there was no file extension. This means that there were no periods to split on, resulting in a one-member array (``"foo".split(".")`` becomes ``["foo"]``). In this case we return ``false``, as the prompt asks for.

Now, in the else case, we know that the array must be larger than 1, meaning that it has a file extension. Since the file extension is always at the end, we know that it must be the last member in the array.

We can find the index of the last member by taking into account array length (``filenameArray.length``) and the fact that the array is zero-indexed, meaning that we need to subtract 1 from this length. Now we know the extension exists and is at the end of the array, so all we need to do is return it:

    return filenameArray[filenameArray.length - 1];
{:lang="javascript"}

### Quiz 4: longestString

#### Problem
    function longestString(i) {
        // i will be an array.
        // return the longest string in the array
        
    }
{:lang="javascript"}

#### Solution
    function longestString(i) {
        // i will be an array.
        // return the longest string in the array
     
        var longest = ””,
            n, len;

        for(n=, len=i.length; n<len; n++) {
            if(typeof n[i] !== “string”) {
                //  not a string, go to next iteration of the loop
                continue;
            }

            if(n[i].length > longest.length) {
                //  Current string is longer, so set it as the new longest string
                longest = n[i];
            }
        }   
    }
{:lang="javascript"}

#### Explanation

This is a pretty classic interview question. It's fairly easy and straightforward: just keep track of the longest string in a variable, then loop through all the members of the array. If the current member is longer, set it as the new longest string. At the end, return whatever that variable contains.

Note the extra sanitization check here to make sure the type is a string. If it's not a string, we ``continue`` to continue to the next iteration of the ``for`` loop. (Note that this is similar to returning early in functions)

### Quiz 5: arraySum

#### Problem
    function arraySum(i) {
        // i will be an array, containing integers, strings and/or arrays like itself.
        // Sum all the integers you find, anywhere in the nest of arrays.   
    }
{:lang="javascript"}

#### Solution
    function arraySum(i) {
        var sum = ,
            n, len;

        if(typeof i === “number”) {
            //  i has been defined as a simple number through a recursive call
            sum += i;
        } else if(Array.isArray(i)) {
            //  i is an array, so iterate through it
            for(n=, len=i.length; n<len; n++) {
                //  recursive call
                sum += arraySum(i[n]);
            }
        }

        return sum;
    }
{:lang="javascript"}

#### Explanation

The best way to handle this one is through recursion, which is tricky but powerful. I admit that on my first attempts writing it in the console, my browser froze up and I had to restart it.

Recursive functions are very elegant but tricky. It helps to step through with examples.

First, let's start with ``arraySum(1)``. The output is of course 1, but note that we didn't actually input an array. The code took the first codepath in the ``if`` statement (because ``typeof 1 === "number"`` is true)

Let's see what happens when we input a basic array:

    arraySum([1]);  // 1
{:lang="javascript"}

Again the answer is 1, but this time the codepath was different. This time ``Array.isArray([1])`` was true, and the function was called recursively for each of the members in the array. That is to say, each member of the array (in this case the single member) was sent to arraySum as a simple integer. So the recursive call was the same as the original example: ``arraySum(1)``, and the output was the same.

In the case of more numbers, the outputs are all added to the ``sum`` and then returned back at the end of the function.

Note that this works quite well for even deeply nested arrays, since arraySum() has logic for arrays that will always return the sum of all of its deeply nested integers:

    arraySum([1, [2,[3,[4,[5]]]]]);   // 15
{:lang="javascript"}

 [1]: http://toys.usvsth3m.com/javascript-under-pressure/