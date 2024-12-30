
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
    
    return (
        
        <div className="max-w-4xl mx-auto my-10 bg-white border shadow shadow-2xl border-emerald-500 p-7 rounded-2xl sm:px-6 lg:px-8">
            
            <Table className="shadow ">
                <TableCaption className="my-10 text-center text-red-500"> <hr className='w-full h-1 my-2 bg-gray-400' /> A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow className="text-orange-500">
                        <TableHead className="text-orange-500 " > Date     <hr className='w-full h-1 my-2 bg-gray-400' /> </TableHead>
                        <TableHead className="text-orange-500 " > Job Role <hr className='w-full h-1 my-2 bg-gray-400' /> </TableHead>
                        <TableHead className="text-orange-500 " > Company  <hr className='w-full h-1 my-2 bg-gray-400' /> </TableHead>
                        <TableHead className="text-right text-orange-500" >Status <hr className='w-full h-1 my-2 bg-gray-400' /> </TableHead>
                    </TableRow>
                </TableHeader>
                
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? <span>You applied any job yet.</span> : allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell> {appliedJob?.createdAt?.split("T")[0]} </TableCell>
                                <TableCell> {appliedJob.job?.title} </TableCell>
                                <TableCell> {appliedJob.job?.company?.name} </TableCell>
                                <TableCell className="text-right text-yellow-500 cursor-pointer "> 
                                    <Badge variant="outline" className={`${appliedJob?.status === "rejected" ? 'bg-red-500 text-yellow-500' : appliedJob.status === 'pending' ? 'bg-gray-400 text-black' : 'bg-green-400 text-black'}`}>
                                        {appliedJob.status.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    } 
                </TableBody>
                
            </Table>
        </div>
    )
}

export default AppliedJobTable;