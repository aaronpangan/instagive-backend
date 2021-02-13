

















// Add Updates (Org Side) Needs Post ID

exports.addupdates = async (req, res) => {
    console.log(req.files);
  
    // check if there is image, otherwise return an emptry array
    let imageList = [];
    if (req.files) {
      req.files.forEach((name) => imageList.push(name.filename));
    }
  
    const updates = await new Updates({
      PostId: req.params.postId,
      datePosted: Date.now(),
      imageList: imageList,
      description: req.body.updateDescription,
    });
  
    await updates.save();
  
    res.send('Update Added Successfuly');
  };
  
  
  
  
  
  
  
   // Delete Update
  exports.deleteUpdates = async (req, res) => {
    const update = await Updates.findByIdAndDelete(req.params.updatesId);
  
    res.send('Update Successfuly Deleted');
  };
  
  async function returnPost(id) {
    const post = await Post.findById(id);
  
    return post;
  }
  
  async function returnUpdates(id) {
    const updates = await Updates.find({
      PostId: id,
    });
  
    return updates;
  }
  
  