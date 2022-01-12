const handleImage = (req, res, knex) => {
    const { id } = req.body;
    knex('users').where({id}).increment({entries: 1}).
        returning('entries').
        then(entries => {
            if(entries.length) {
                res.json(entries[0]);
            }
            else{
                res.json('User not found');
            }
        })
        .catch(err => res.status(400).json('Unable to get entries'));   
}

module.exports = {
    handleImage
}