# ovovo

So, it come to this, huh. You've unsuccesfully witheld your obsessive urge for absolute and total control over the typographie on your website and you are scouring the internet for a simple, lightweight library that will allow you to assign a kerning group to all letters within a targeted selector based on the word in which they occur.  

Honestly, this is starting to get out of hand. You checked out some other kerning libs but they either 1) don't support maintaining a nested element structure, 2) require wrapping indivudal words in an ID tag (tedious), or 3) require writing a lot of css (tedious). And they are all based on jquery (why).  

Maybe the problem is you. Who *really* needs this? Is this even healthy, allowing your OCD to blossom to such a level?  

## installing

~~~
npm i ovovo --save
~~~

~~~
ovovo('.u-kern') // or whatever selector you choose
~~~

## syntax

ovovo uses CSS3's variable syntax for assigning kerning values (in em's) to sets of letters based on the word in which they occur. Here, like this:

~~~
[data-word="ovovo"] {
    --kerning: -0.075 -0.075 -0.075 -0.075;
}
~~~

## result

~~~
<main class="kern">
    <h1>ovovo</h1>
</main>
~~~

becomes...  

~~~
<main class="kern">
    <h1>
        <span class="Word" data-word="ovovo">
            <span class="Letter" data-letter="o">o</span>
            <span class="Letter" data-letter="v">v</span>
            <span class="Letter" data-letter="o">o</span>
            <span class="Letter" data-letter="v">v</span>
            <span class="Letter" data-letter="o">o</span>
        </span>
    </h1>
</main>
~~~

## to do  
* [ ] unit testing
* [ ] ???


