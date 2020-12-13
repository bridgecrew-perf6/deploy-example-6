const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const {v4: uuidv4} = require('uuid');

const USERS = [
  {
    login: 'admin@g.g',
    password: '123123',
  },
];

const EMAILS = {
  "inbox": [
    {
      "id": "0001",
      "subject": "Delivery order #32232323",
      "from": "delivery@eshop.coco.com",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequuntur fuga hic iusto nesciunt nostrum porro quos ullam. Cumque dolor eaque eveniet pariatur quam qui repellat repellendus reprehenderit sint ut!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequuntur fuga hic iusto nesciunt nostrum porro quoolor sit amet, consectetur adipisicing elit. Architecto consequuntur fuga hic iusto nesciunt nostrum porro quos ullam. Cumque dolor eaque eveniet pariatur quam qui repellat repellendus reprehenderit sint ut!"
    },
    {
      "id": "0002",
      "subject": "You're fired",
      "from": "boss@bossy.boss.com",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequuntur fuga hic iusto nesciunt nostrum porro quos ullam. Cumque dolor eaque eveniet pariatur quam qui repellat repellendus reprehenderit sint ut!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequuntur fuga hic iusto nesciunt nostrum porro quos uehenderit sint ut!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequuntur fuga hic iusto nesciunt nostrum porro quos ullam. Cumque dolor eaque eveniet pariatur quam qui repellat repellendus reprehenderit sint ut!"
    },
    {
      "id": "0003",
      "subject": "Your car is ready!",
      "from": "legasy@service.com",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequunturt repellendus reprehenderit sint ut!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequuntur fuga hic iusto nesciunt nostrum porro quos ullam. Cumque dolor eaque eveniet pariatur quam qui repellat repellendus reprehenderit sint ut!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequuntur fuga hic ius dolor eaque eveniet pariatur quam qui repellat repellendus reprehenderit sint ut!"
    },
    {
      "id": "0004",
      "subject": "Wat do you think about our new features",
      "from": "body-parser@npm.no",
      "text": "Lorem ipsum dolor sit amet, consque eveniet pariatur quam qui repellat repellendus reprehenderit sint ut!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequuntur fuga hic iusto nesciunt nostrum porro quos ullam. Cumque dolor eaque eveniet pariatur quam qui repellat repellendus reprehenderit sint ut!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequuntur fuga hic iusto nesciunt nostrum porro quos ullam. Cumque dolor eaque eveniet pariatur quam qui repellat repellendus reprehenderit sint ut!"
    },
    {
      "id": "0005",
      "subject": "TOP SALE!! 90% OFF",
      "from": "sales@kexshop.nd",
      "text": "Lorem ipsum dolor sadipisicing elit. Architecto consequuntur fuga hic iusto nesciunt nostrum porro quos ullam. Cumque dolor eaque eveniet pariatur quam qui repellat repellendus reprehenderit sint ut!"
    },
    {
      "id": "0006",
      "subject": "Ya tibya po IP vichislil!!!",
      "from": "unknown",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequuntur fuga hic iusto nesciunt nostrum porro quos ullam. Cumque dolor eaque eveniet pariatur quam qui repellat repellendus reprehenderit sint ut!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequuntur fuga hic iusto nesciunt nostrum porro quos ullam. Cumque dolor eaque eveniet pariatur quam qui repellat repellendus reprehenderit sint ut!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequuntur fuga hic iusto nesciunt nostrum porro quos ullam. Cumque dolor eaque eveniet pariatur quam qui repellat repellendus reprehenderit sint ut!"
    }
  ],
  "sent": [
    {
      "id": "0007",
      "subject": "Give me back my money",
      "to": "sales@kexshop.nd",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequuntur fuga hic iusto nesciunt nostrum porro quos ullam. Cumque dolor eaque eveniet pariatur quam qui repellat repellendus reprehenderit sint ut!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequuntur fuga hic iusto nesciunt nostrum porro quos ullam. Cumque dolor eaque eveniet pariatur quam qui repellat repellendus reprehenderit sint ut!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequuntur fuga hic iusto nesciunt nostrum porro quos ullam. Cumque dolor eaque eveniet pariatur quam qui repellat repellendus reprehenderit sint ut!"
    },
    {
      "id": "0008",
      "subject": "Contract #588820 closed",
      "to": "big-boss@bossy.boss.com",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequuntur fuga hic iusto nesciunt nostrum porro quos ullam. Cumque dolor eaque eveniet pariatur quam qui repellat repellendus reprehenderit sint ut!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequuntur fuga hic iusto nesciunt nostrum porro quos ullam. Cumque dolor eaque eveniet pariatur quam qui repellat repellendus reprehenderit sint ut!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequuntur fuga hic iusto nesciunt nostrum porro quos ullam. Cumque dolor eaque eveniet pariatur quam qui repellat repellendus reprehenderit sint ut!"
    }
  ],
  "draft": [
    {
      "id": "0009",
      "subject": "",
      "to": "hr@terrasoft",
      "text": "I'm looking for a job...."
    },
    {
      "id": "00010",
      "subject": "About Tuesday meeting",
      "to": "nobody@from-the.wc",
      "text": ""
    },
    {
      "id": "00011",
      "subject": "",
      "to": "",
      "text": "What did yo mean, saying "
    }
  ],
  "spam": []
};

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname, "/public"));

app.post('/api/users/', (req, res) => {
  const user = req.body;
  USERS.push(user);
  res.send(user);
});

app.post('/api/users/login', (req, res) => {
  const user = req.body;
  const userFromDB = USERS.find(u => u.login === user.login && u.password === user.password);
  
  res.send({
    status: !!userFromDB,
    data: userFromDB
  });
})

app.get("/api/emails", (req, res) => {
  res.send(EMAILS);
});

app.get('/api/emails/:folder', (req, res) => {
  const {folder} = req.params;
  
  res.send(EMAILS[folder]);
})

app.get("/api/emails/:emailID", (req, res) => {
  const {emailID} = req.params;
  let requestedEmail = null;
  
  Object.keys(EMAILS).forEach(box => {
    const find = EMAILS[box].find(email => email.id === emailID);
    
    if (find) {
      requestedEmail = find
    }
  });
  res.send(requestedEmail);
});

app.post("/api/emails/:folder", (req, res) => {
  const {folder} = req.params;
  const newEmail = req.body;
  
  newEmail.id = uuidv4();
  
  EMAILS[folder].push(newEmail);
  
  res.send({
    message: "email saved successfully",
    data: newEmail
  });
});

app.listen(PORT, () => {
  console.log("server is listening on port " + PORT)
});