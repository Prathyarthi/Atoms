import zod from 'zod'
import { Community } from '../model/communitySchema.js'

const communitySchemaToBeParsed = zod.object({
    title: zod.string(),
    description: zod.string()
})

const createCommunity = async (req, res) => {
    const { title, description } = req.body;
    try {
        const communityParsed = communitySchemaToBeParsed.safeParse(req.body)

        if (!communityParsed.success) {
            res.status(400).json({
                success: false,
                message: "Title and Description are required"
            })
        }

        const community = await Community.create({
            title,
            description
        })

        if (!community) {
            res.status(400).json({
                success: false,
                message: "Couldn't create community"
            })
        }

        res.status(200).json({
            success: true,
            message: "Community created successfully",
            data: community
        })
    } catch (error) {
        console.log(error);
    }
}

const getCommunities = async (req, res) => {
    try {
        const communities = await Community.find({})

        if (!communities) {
            res.status(400).json({
                success: false,
                message: "Couldn't fetch communities"
            })
        }

        res.status(200).json({
            success: true,
            message: "Communities fetched successfully!",
            data: communities
        })
    } catch (error) {
        console.log(error);
    }
}

const deleteCommunity = async (req, res) => {
    const { id } = req.params

    try {
        // const deleteCommunity = await Community.findByIdAndDelete({
        //     id
        // })

        // if (!deleteCommunity) {
        //     res.status(400).json({
        //         success: false,
        //         message: "Community doesn't exist or something went wrong"
        //     })
        // }

        // res.status(200).json({
        //     success: true,
        //     message: "Community deleted"
        // })

        const { id } = req.params;

        const community = await Community.findById(id);

        if (!community) {
            res.status(200).json({
                success: false,
                message: "Community couldn't be deleted",
            });
        }

        await community.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Community deleted successfully',
        });
    } catch (error) {
        console.log(error);
    }
}

export {
    createCommunity,
    getCommunities,
    deleteCommunity
}