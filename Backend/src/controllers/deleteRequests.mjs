import todoModel from "../models/model.mjs";

export const deleteTodo = async (req,res) => {
    try {
        await todoModel.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
            message : 'Todo deleted successfully'
        })
    } catch (error) {
        res.send({
            success: false,
            error
        });
    }
};


export const deleteAllTodos = async (req, res) => {
    try {
        await todoModel.deleteMany({});
        res.send({
            success: true,
            message : 'All Todo deleted successfully'
        })
    } catch (error) {
        res.send({
            success: false,
            error
        });
    }
};