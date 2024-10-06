import { Note } from "../models/note.model.js";

export const addNote = async ( req, res ) => {

    const { title, content, tags = [] } = req.body;
    const user = req.user;

    if( !title || !content ) return res.status(400).json({ success: false, message: "Please fill full form" });

    try{

        const noteExist = await Note.findOne({ title });

        if(noteExist) return res.status(400).json({ success: false, message: "Note with this title already exists!" });

        const newNote = await Note.create({
            title,
            content,
            tags: tags,
            userId: user._id
        });

        return res.status(200).json({ success: true, message: "Note created successfully", newNote });

    }catch( error ){

        console.log("Error: ", error);
        return res.status(500).json({ success: false, message: "Internal server error!" })
    }

}


export const updateNote = async ( req, res ) => {
    
    const { title, content, tags } = req.body;
    const user = req.user;
    const { noteId } = req.params;

    if( !title && !content && !tags ) return res.status(400).json({ success: false, message: "No fields to update." });

    try {

        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if(!note) res.status(500).json({ success: false, message: "No note found." });

        if(title) note.title = title;
        if(content) note.content = content;
        if(tags) note.tags = tags;

        await note.save();

        res.status(200).json({ success: true, message: "Your note updated successfully", Note: note });

    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ success: false, message: "Internal Server Error." })
    }
}


export const deleteNote = async ( req, res ) => {

    const user = req.user;
    const { noteId } = req.params;
    
    try {

        const note = await Note.findOne({ userId: user._id, _id: noteId });
        
        if ( !note ) return res.status(400).json({ success: false, message: "No note found" });

        await Note.deleteOne({ userId: user._id, _id: noteId });

        return res.status(200).json({ success: true, message: "Note deleted successfully" });

    } catch (error) {

        console.log("Error: ", error);
        return res.status(500).json({ success: false, message: "Internal serval error." });
    }
}


export const getAllNotes = async ( req, res ) => {

    const user = req.user;

    try {
        
        const allNotes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });

        return res.status(200).json({ success: true, message: "All notes found.", allNotes });

    } catch (error) {

        console.log("Error: ", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}

export const pinNote = async ( req, res ) => {

    const user = req.user;
    const { noteId } = req.params;
    const { isPinned } = req.body;

    try {

        const foundNote = await Note.findOne({ _id: noteId, userId: user._id});

        foundNote.isPinned = isPinned;
        await foundNote.save();

        return res.status(200).json({ success: true, message: "Note updated successfully", Note: foundNote });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const findNotes = async (req, res) => {
    const query = req.query.term;
    const user = req.user;

    if(!query){
        return res.status(400).json({ success: false, message: "Search parameter is required" });
    }

    try {
        const response = await Note.find({ 
            userId: user._id, title: { $regex: new RegExp(query, "i") }
        });
        

        if(response.length > 0){
            res.status(200).json({ success: true, messages: "Notes found successfully!", response });
        }else{
            res.status(200).json({ success: true, messages: "No notes found "});
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}