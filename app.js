const express = require('express');
const app = express();


// routes

app.use('/api/v1/tasks', (req,res)=>{
    res.send("kjsndcd")
});

// app.use(notFound);
// app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();