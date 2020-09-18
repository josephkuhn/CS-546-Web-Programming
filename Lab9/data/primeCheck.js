const cnt = document.getElementById("primes");

function isPrime(x) {
    if (x <= 1) 
    {
      return false;
    }
    else if (x <= 3 && x > 1)
    {
      return true;
    }
    else if (x % 2 === 0 || x % 3 === 0)
    {
      return false;
    }
    for (let y = 5; y * y <= x; y += 6) 
    {
        if (x % y === 0 || x % (y + 2) === 0) 
        {
          return false;
        }
    }
    return true;
}
if (cnt) 
{
  const num = document.getElementById("input");
  cnt.addEventListener("submit", event => {
    event.preventDefault();

    if (num.value)
    {
      if (isPrime(num.value))
      {
        $("#error").hide();
        const li = `<li class="is-prime">${input.value} is a prime number</li>`
        $("#attempts").append(li);
        $("#primes").trigger('reset');
      }
      else
      {
        const li = `<li class="not-prime">${input.value} is NOT a prime number</li>`
        $("#error").hide();
        $("#attempts").append(li);
        $("#primes").trigger('reset');
      }
    }
    else
    {
      $("#error").show();
      $("#error").html("You must provide a number.")
    }
  });
}