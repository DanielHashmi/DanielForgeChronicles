---
title: Regex
author: Daniel Hashmi
date: 11/30/2024
slug: Regex
image: regex.png
desc: This is a regex cheatsheet that can be useful for quick reference and can make things clear with straightforward definition...
---

"." indicates any character

"+" indicates one or more characters

"*" indicates zero or more characters

"^" indicates to starts with

"$" indicates to end with

"\w" indicates word characters as well as numbers and the underscores

"\W" indicates not a word characters as well as numbers and the underscores

"\d" indicates decimal digits

"\D" indicates not decimal digits

"\s" indicates whitespace characters

"\S" indicates not a whitespace characters

"|" indicates or

"A|B" indicating A or B

"()" indicates grouping different logics

"(\w|\s)" indicating words numbers underscores or spaces are allowed

".*" this is how we use it to say zero or more characters

"..*" this is how we use it to say one or more characters with asterisk

".+" this is how we use it to say one or more characters

"[]" a set of characters you want to specify

"[^]" a set of characters you don't want to specify

"[^@]" indicates except @

"[^@]+" indicates any characters except @

"[a-z]" indicates you just allow a through z

"[A-Z]" indicates you just allow A through Z

"[0-9]" indicates you just allow 0 through 9

"[0-9A-Za-z]" you can also specify multiple checks like this

"...etc" multiple dots indicates multiple any characters

some special characters means different in regex so you need to use backslash "\"
directly putting characters in regex string means that they are required
