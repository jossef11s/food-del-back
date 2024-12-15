import userModel from '../models/userModel.js'

//add items to user cart
const addToCart = async (req,res)=>{
    try{
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId]=1
        }
        else{
            cartData[req.body.itemId] +=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({sucssess:true, message:"Added To Cart"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"error"})

    }

}

//remove items to user cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Find user by ID
        let userData = await userModel.findById(userId);

        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // Access the cart data
        let cartData = userData.cartData;

        // Check if the item exists in the cart and has a count > 0
        if (cartData[itemId] && cartData[itemId] > 0) {
            cartData[itemId] -= 1; // Decrement the item count

            // Remove the item if its count becomes 0
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        } else {
            return res.json({ success: false, message: "Item not found in cart or already at 0" });
        }

        // Update the user's cart in the database
        await userModel.findByIdAndUpdate(userId, { cartData });

        return res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: "Error occurred while removing item from cart" });
    }
};


//fetch user cart
const getCart = async (req,res)=>{
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true ,cartData})
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})

    }
    
    
}

export {addToCart,removeFromCart,getCart}