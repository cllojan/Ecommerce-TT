import {mongooseConnect} from "@/lib/mongoose";
import {Order} from "@/models/Order";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();
  // await isAdminRequest(req,res);

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Order.findOne({_id:req.query.id}));
    } else {
      res.json(await Order.find());
    }
  }

  if (method === 'POST') {
    const {line_items,name,email,cellphone,city,postalCode,streetAddress,country,paid} = req.body; 
    const orderDoc = await Order.create({
      title,description,price,images,category,properties,
    })
    res.json(orderDoc);
  }

  if (method === 'PUT') {
    const {line_items,name,email,cellphone,city,postalCode,streetAddress,country,paid, _id} = req.body;
	console.log(req.body)
    await Order.updateOne({_id}, {line_items,name,email,city,postalCode,streetAddress,country,paid});
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Order.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }
}