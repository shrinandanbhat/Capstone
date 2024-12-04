const Member = require('../models/Member');

exports.addMember = async (req, res) => {
    try {
        const newMember = new Member(req.body);
        await newMember.save();
        res.status(201).json(newMember);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.updateMember = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedMember = await Member.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedMember) return res.status(404).json({ error: 'Member not found' });
        res.json(updatedMember);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.deleteMember = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMember = await Member.findByIdAndDelete(id);
        if (!deletedMember) return res.status(404).json({ error: 'Member not found' });
        res.json({ message: 'Member deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


