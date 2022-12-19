import BugReportIcon from '@mui/icons-material/BugReport';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';

export const taskTypeMap = {
    1: {
        icon: <BugReportIcon fontSize='inherit' color='secondary' />,
        name: "Bug"
    },
    2: {
        icon: <ListAltIcon fontSize='inherit' color='success' />,
        name: "New Task"
    }
}

export const priorityMap = {
    1: {
        icon: <ArrowUpwardOutlinedIcon fontSize='inherit' color='warning' />,
        name: "High"
    },
    2: {
        icon: <ArrowUpwardOutlinedIcon fontSize='inherit' color='success' />,
        name: "Medium"
    },
    3: {
        icon: <ArrowDownwardOutlinedIcon fontSize='inherit' color='primary' />,
        name: "Low"
    },
    4: {
        icon: <ArrowDownwardOutlinedIcon fontSize='inherit' color='action' />,
        name: "Lowest"
    }
}

export const statusMap = {
    1: {
        // icon: <ArrowUpwardOutlinedIcon fontSize='inherit' color='warning' />,
        name: "BACKLOG"
    },
    2: {
        // icon: <ArrowUpwardOutlinedIcon fontSize='inherit' color='success' />,
        name: "SELECTED FOR DEVELOPMENT"
    },
    3: {
        // icon: <ArrowDownwardOutlinedIcon fontSize='inherit' color='primary' />,
        name: "IN PROGRESS"
    },
    4: {
        // icon: <ArrowDownwardOutlinedIcon fontSize='inherit' color='action' />,
        name: "DONE"
    }
}