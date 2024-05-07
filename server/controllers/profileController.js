const jwt = require("jsonwebtoken");
const pool = require("../db");

module.exports.handleUpdateProfile = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.json({ loggedIn: false });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        userId = decodedToken.id;
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { profile_image_url, bio, first_name, last_name } = req.body;

    try {
        let query;
        query = `SELECT * FROM profiles WHERE user_id=$1`;
        const existingProfileResult = await pool.query(query, [userId]);
        console.log(existingProfileResult);
        if (existingProfileResult.rows.length > 0) {
            query = `UPDATE profiles SET 
            profile_image_url=COALESCE(1,profile_image_url), 
            bio=COALESCE(2,bio),
            first_name=COALESCE(3,first_name),
            last_name=COALESCE(4,last_name)
            WHERE user_id=$5 RETURNING id, profile_image_url, bio, first_name, last_name`;
            const updatedProfileResult = await pool.query(query, [
                profile_image_url,
                bio,
                first_name,
                last_name,
            ]);
            return res.status(200).json(updatedProfileResult.rows[0]);
        } else {
            query = `INSERT INTO profiles(user_id ,profile_image_url,bio, first_name, last_name) VALUES ($1,$2,$3,$4,$5) RETURNING id, profile_image_url, bio, first_name, last_name`;
            const newProfileResult = await pool.query(query, [
                userId,
                profile_image_url,
                bio,
                first_name,
                last_name,
            ]);
            console.log(newProfileResult);

            return res.status(201).json(newProfileResult.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error on server" });
    }
};
