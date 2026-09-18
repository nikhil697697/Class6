const crypto = require("crypto");

const PASSWORDS = [
  "NIKKANNU",
  "tilldeathdousapart"
];

const LETTER = `
Hi love 
even if you dont consider myself the love. 
I planned to text you again and again tell you how badly i need you and all. cuz after all that has happened 
and all the things i have proved against "my friend" i don't know why but i thought you will consider giving US a chance .
love - I literally proved his statements his ss his story his whole personality as lier i thought now atleast you will trust me but nothing was enough.

You still think i am that asshole , i wish i was that asshole so moving on from you could have been eaiser .but no i loved you and always will.

keeping the fact that your bestie has told me to not ruin your life anymore and im just making your life difficult..ill delete all the data on you ,your friends, your bhaiya , your bhai's friends, papa ,papa'friends , relatives and GBs of just about you .
Also ill go your way you said you will text weekly ill wait , you said to come to you in 2032 i will.

Ever feel like talking, you know how to find me .

Sayonara Love of my life - Ananya Chauhan.
`;

function hash(value) {
  return crypto
    .createHash("sha256")
    .update(value)
    .digest("hex");
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { password } = req.body || {};

  if (!password || !PASSWORDS.includes(password)) {
    return res.status(401).json({
      success: false,
      error: "Incorrect password"
    });
  }

  // Create a short-lived signed token.
  const timestamp = Date.now();
  const data = `${timestamp}:${hash(password)}`;

  return res.status(200).json({
    success: true,
    token: Buffer.from(data).toString("base64"),
    letter: LETTER.trim()
  });
};
