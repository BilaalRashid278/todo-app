import todoModel from "../models/model.mjs";


export const updateTodo = async (req,res) => {
    try {
        const updatedTodo = await todoModel.findByIdAndUpdate({_id : req.params.id},req.body);
        res.send({
            success : true,
            message : 'Todo  updated successfully',
            updatedTodo
        });
    } catch (error) {
        res.send({
            success : false,
            message : 'Todo not updated'
        });
    }
};