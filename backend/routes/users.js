const router = require('express').Router();
const {
  getAllUsers, getUser, getUserInfo, updateUser, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.get('/me', getUserInfo)
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
