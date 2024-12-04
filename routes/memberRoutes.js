const express = require('express');
const {
    addMember,
    updateMember,
    deleteMember,
} = require('../controllers/memberController');
const router = express.Router();

router.post('/add', addMember);
router.put('/update/:id', updateMember);
router.delete('/delete/:id', deleteMember);

module.exports = router;
