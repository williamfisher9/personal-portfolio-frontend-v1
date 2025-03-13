import { useParams } from 'react-router-dom';
import './ProjectDetails.css'
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../../constants/Constants';
import axios from 'axios';
import { TbSquareRoundedChevronsRight } from 'react-icons/tb';
import { VscTriangleRight } from 'react-icons/vsc';
import { TiChevronRightOutline } from 'react-icons/ti';

const ProjectDetails = () => {
    const params = useParams()
    const[projectDetails, setProjectDetails] = useState({})
    const [projectPosts, setProjectPosts] = useState([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/portfolio/items/${params.id}`)
        .then(res => {
            console.log(res.data.message)
            setProjectDetails(res.data.message)


            axios.get(`${BACKEND_URL}/api/v1/portfolio/items/get-posts/${params.id}`)
            .then(res => {
                setProjectPosts(res.data.message)
            })

        })
        .catch(err => {
            err.message
        })
    }, [])

    return <div className='flex flex-col gap-7'>
        <div className='flex justify-center items-center text-4xl'>
            {projectDetails.title}
        </div>

        <div className='flex justify-center items-center'>
            <img className='h-[400px]' src={projectDetails.main_image_source} alt='image' />
        </div>

        <div className=''>
            <div className='flex gap-1 justify-start items-center  mb-2'>
                <TiChevronRightOutline className='size-7'/>
                <p className='text-2xl'>Description</p>
            </div>
            
            <div className='pl-[32px]'>
            <p>{projectDetails.description}</p>
            </div>
        </div>

        <div className=''>
            <div className='flex gap-1 justify-start items-center  mb-2'>
                <TiChevronRightOutline className='size-7'/>
                <p className='text-2xl'>Application URL</p>
            </div>
            <div className='pl-[32px]'>
                <a href={projectDetails.link} target='_blank'>Visit <span className='underline'>{projectDetails.title}</span></a>
            </div>
        </div>

        <div className=''>
            <div className='flex gap-1 justify-start items-center  mb-2'>
                <TiChevronRightOutline className='size-7'/>
                <p className='text-2xl'>Related Posts</p>
            </div>
            <div className='flex flex-col pl-[32px]'>
                {
                    projectPosts.map(item => {
                        return <a className='underline' key={item.id} href={`/portfolio/blog/posts/${item.id}`}>{item.title}</a>
                    })
                }
            </div>
        </div>

        
    </div>
}

export default ProjectDetails;