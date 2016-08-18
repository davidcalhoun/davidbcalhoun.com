---
title: 'PHP: dealing with stuff that doesn&#8217;t exist'
date: 2009-12-01
comments: true
author: David
layout: post
permalink: /2009/php-dealing-with-stuff-that-doesnt-exist
categories: ["php", "programming", "webdev"]
tags:
  - exists
  - function_exists
  - isset
  - method_exists
  - php
---
### Introduction

As the application you&#8217;re coding becomes more and more complex, there&#8217;s more of an opportunity for things to go wrong in all sorts of unforseen ways.  One of these problems is variables or functions that don&#8217;t exist.  The problem is when you code in such a way that you presuppose their existence. But their existence isn&#8217;t guaranteed!

A simple case of this happening is when you&#8217;re dealing with user input.  As it turns out, the user didn&#8217;t fill out a text field, but the variable for that text field still gets passed around as if it did exist.  More specifically, the variable gets set, but it gets set to an empty string (&#8221;).

### Check that the variable isn&#8217;t empty

A common way of dealing with this is to check that the variable isn&#8217;t empty before using it:

<pre name="code" class="PHP">$name = 'Joe';
if($name != '') {
	echo 'Hello ' . $name;
}</pre>

This turns out to be ALMOST equivalent to the following, which uses [empty()][1]:

<pre name="code" class="PHP">$name = 'Joe';
if(!empty($name)) {  // make sure $name isn't empty
    echo 'Hello ' . $name;
}
</pre>

However, as [Zachary Johnson][2] points out, empty($variable) evaluates to true when $variable=&#8217;0&#8242;, so you may want to avoid using this.

### Check that the variable is defined

There&#8217;s another case we haven&#8217;t tried yet: what happens if we haven&#8217;t defined the variable?

<pre name="code" class="PHP">error_reporting(E_ALL);
if($name != '') {
	echo 'Hello' . $name;
}</pre>

Nothing catastrophic happens, but if we turn on error reporting, we can see that PHP is a bit upset. We get a notice that the variable $name is undefined, yet we&#8217;re trying to evaluate it. The value hasn&#8217;t been set yet. And there&#8217;s a function to check for that:

<pre name="code" class="PHP">$name = 'Joe';
if(isset($name)) {
	echo 'Variable is set';
}</pre>

We can combine what we&#8217;ve learned into the following:

<pre name="code" class="PHP">$name = 'Joe';
if(isset($name) &#038;&#038; $name != '') {
	echo 'Hello ' . $name;
}</pre>

There&#8217;s one neat thing here &#8211; if $name isn&#8217;t set, it evaluates the first part of the If condition as false (isset($name)) and doesn&#8217;t even look at the second part of the If condition ($name != &#8221;). This is because it doesn&#8217;t matter what comes after, it will still evaluate to false (false &#038;&#038; true evaluates to false, and false &#038;&#038; false evaluates to false). Looking at the rest of the If condition is a waste of CPU cycles, so PHP doesn&#8217;t do it!

We can confirm this with the following code, which evaluates to false on the first If condition, then doesn&#8217;t even try to evaluate the call to a nonexisting function, and thus gives no errors:

<pre name="code" class="PHP">if(false &#038;&#038; function_that_doesnt_exist()) {
	// do stuff here
}</pre>

### Check if a function exists

For functions there&#8217;s a similar helper called [function_exists()][3]:

<pre name="code" class="PHP">function my_function() { }
if(function_exists('my_function')) {
	my_function();
}</pre>

And it doesn&#8217;t matter if your function is declared before or after you call it! Check it out &#8211; this works fine:

<pre name="code" class="PHP">if(function_exists('my_function')) {
	my_function();
}
function my_function() { }</pre>

### Check if an object&#8217;s method exists

Similarly to checking if functions exist, we can check for the existence of functions belonging to an object (we call these the object&#8217;s methods) with [method_exists()][4]:

<pre name="code" class="PHP">// Create a test class
class myClass {
	// Create a test function
	public function my_function() {}
}

// Instantiate the class
$myObject = new myClass();

// Check to see if the test function exists
if(method_exists($myObject, 'my_function')) {
	// Do stuff here
}</pre>

 [1]: http://www.php.net/manual/en/function.empty.php
 [2]: http://www.zachstronaut.com/posts/2009/02/09/careful-with-php-empty.html
 [3]: http://us3.php.net/manual/en/function.function-exists.php
 [4]: http://php.net/manual/en/function.method-exists.php