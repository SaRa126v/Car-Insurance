// get Solar Hijri year in number & in English........... 
// "en-Us-u-ca-persian" > a Unicode 
// Intl.DateTimeFormat / format() > an API for time format 

// 1) this is more customizable 
const shamsiFormat = new Intl.DateTimeFormat("en-Us-u-ca-persian", {year:"numeric"}).format(new Date()).replace(' AP','');

// or

// 2) this is simpler
const date = new Date();
const shamsi = date.toLocaleDateString("en-Us-u-ca-persian", {year:"numeric"}).replace(' AP','');

// get the current year & its previous 10 years............
