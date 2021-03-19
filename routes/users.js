const router = require('express').Router();
const express = require('express');

router.use(express.urlencoded({ extended: false }));

const {
  getUsers, getUserById, postUsers, patchUserData, patchUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', postUsers);
router.patch('/users/me', patchUserData);
router.patch('/users/me/avatar', patchUserAvatar);

module.exports = router;
