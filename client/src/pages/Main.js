import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Drawer, FormControl, IconButton, InputLabel, List, ListItem, ListItemIcon, ListItemText, MenuItem, Select, Toolbar, Typography, Collapse } from '@mui/material'; // Thêm Collapse vào import
import React, { Component } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import launchViewer, { getSelection } from './Viewer/ViewerFunctions';
import ExpandLess from '@mui/icons-material/ExpandLess'; // Thêm ExpandLess vào import
import ExpandMore from '@mui/icons-material/ExpandMore'; // Thêm ExpandMore vào import
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// Import các icon cần thiết
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MessageIcon from '@mui/icons-material/Message';
import MapIcon from '@mui/icons-material/Map';
import ArchiveIcon from '@mui/icons-material/Archive';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            doorFinish: "Satin",
            collections: [],
            selectedCollection: '',
            documents: [],
            collectionDetails: {}, // To store the linkanh and urn for each collection
            selectedCarouselIndex: 0, // Track the index of the selected item in the carousel
            showCarousel: true // State to control the visibility of the carousel
        };
    }

    componentDidMount() {
        this.fetchCollections();
    }

    fetchCollections = () => {
        fetch('http://localhost:8080/zz')
            .then(response => response.json())
            .then(data => {
                if (data.collections) {
                    const collections = data.collections;
                    this.setState({ collections }, () => {
                        collections.forEach(collection => {
                            this.fetchFirstDocumentDetails(collection);
                        });
                    });
                } else {
                    console.error('Error: collections data not found in response:', data);
                }
            })
            .catch(error => console.error('Error fetching collections:', error));
    }

    fetchFirstDocumentDetails = (collectionName) => {
        fetch(`http://localhost:8080/collections/${collectionName}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    const firstDocument = data[0];
                    if (firstDocument.linkanh && firstDocument.urn) {
                        this.setState(prevState => ({
                            collectionDetails: {
                                ...prevState.collectionDetails,
                                [collectionName]: {
                                    linkanh: firstDocument.linkanh,
                                    urn: firstDocument.urn,
                                    location: firstDocument.location // Add location field if it exists
                                }
                            }
                        }));
                    }
                }
            })
            .catch(error => console.error(`Error fetching first document of ${collectionName}:`, error));
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleChange = (event) => {
        this.setState({ doorFinish: event.target.value });
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    }

    handleCollectionChange = (event) => {
        const collectionName = event.target.value;
        this.setState({ selectedCollection: collectionName });
        this.fetchDocumentsInCollection(collectionName);
    }

    fetchDocumentsInCollection = (collectionName) => {
        if (collectionName) {
            fetch(`http://localhost:8080/collections/${collectionName}`)
                .then(response => response.json())
                .then(data => {
                    this.setState({ documents: data });
                })
                .catch(error => console.error('Error fetching documents:', error));
        } else {
            this.setState({ documents: [] });
        }
    }

    handleCarouselChange = (index) => {
        if (this.state.selectedCarouselIndex !== index) {
            this.setState({ selectedCarouselIndex: index });
        }
    }

    handleCarouselItemClick = (index) => {
        this.setState({ selectedCarouselIndex: index });
    }

    toggleCarouselVisibility = () => {
        this.setState(prevState => ({ showCarousel: !prevState.showCarousel }));
    }

    // Hàm mở Drawer
    handleDrawerOpen = () => {
        this.setState({ drawerOpen: true });
    }

    // Hàm đóng Drawer
    handleDrawerClose = () => {
        this.setState({ drawerOpen: false });
    }
    // Hàm để mở và đóng danh sách dự án con
    handleProjectClick = () => {
        this.setState(prevState => ({
            openProject: !prevState.openProject
        }));
    }
    
    handleListItemClick = (item) => {
        this.setState((prevState) => ({
            selectedItem: prevState.selectedItem === item ? null : item
        }));
    }

    render() {
        const { open, doorFinish, collections, selectedCollection, documents, collectionDetails, selectedCarouselIndex, showCarousel, drawerOpen, openProject,selectedItem  } = this.state; // Thêm openProject vào đây

            const selectedCollectionName = collections[selectedCarouselIndex];
            const selectedCollectionUrn = collectionDetails[selectedCollectionName]?.urn;

        const responsive = {
            superLargeDesktop: {
                breakpoint: { max: 4000, min: 3000 },
                items: 4
            },
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 4
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1
            }
        };

        return (
            <div className='viewer-home' style={{ display: 'flex' }}>
                <Drawer
                    variant="permanent"
                    anchor="left"
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 240,
                            boxSizing: 'border-box',
                        },
                    }}
                >
                    <Toolbar />
                    <div>
                    <List>
                            {/* Thông tin của người dùng */}
                            <ListItem style={{  paddingTop: 20, borderRadius: 8 }} >
                                <img src="link-to-user-image" alt="User" style={{ width: 50, height: 50, borderRadius: '50%' }} />
                                <ListItemText primary="Tên Người Dùng" secondary="Chức Vụ" />
                            </ListItem>

                            {/* Mục Dự án */}
                            <ListItem 
    button 
    onClick={this.handleProjectClick} 
    style={{ paddingTop: 20, borderRadius: 8 }}
    component={Link} 
    to="/view"
>
    <ListItemIcon><WorkIcon /></ListItemIcon>
    <ListItemText primary="Dự án" />
    {openProject ? <ExpandLess /> : <ExpandMore />}
</ListItem>
                            <Collapse in={openProject} timeout="auto" unmountOnExit>
                                {/* Danh sách các dự án con */}
                                <div style={{ paddingLeft: 50 }}>
                                    <List component="ul">
                                        {collections.map(collection => (
                                            <ListItem 
                                                button 
                                                key={collection} 
                                                style={{ paddingTop: 20, borderRadius: 8,backgroundColor: selectedItem === collection ? '#3177a7' : 'inherit',color: selectedItem === collection ? '#fff' : 'inherit' }} 
                                                onClick={() => this.handleListItemClick(collection)}
                                            >
                                                <ListItemText primary={collection} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            </Collapse>


                            {/* Các mục khác */}
                            <ListItem button component={Link} to="/manager" style={{ paddingTop: 20, borderRadius: 8,backgroundColor: selectedItem === 'manageAccounts' ? '#3177a7' : 'inherit',color: selectedItem === 'manageAccounts' ? '#fff' : 'inherit' }} onClick={() => this.handleListItemClick('manageAccounts')}>
                                <ListItemIcon><ManageAccountsIcon /></ListItemIcon>
                                <ListItemText primary="Quản lý" />
                            </ListItem>
                            <ListItem button component={Link} to="/message" style={{ paddingTop: 20, borderRadius: 8,backgroundColor: selectedItem === 'message' ? '#3177a7' : 'inherit',color: selectedItem === 'message' ? '#fff' : 'inherit' }} onClick={() => this.handleListItemClick('message')}>
                                <ListItemIcon><MessageIcon /></ListItemIcon>
                                <ListItemText primary="Tin nhắn" />
                            </ListItem>
                            <ListItem button component={Link} to="/map" style={{ paddingTop: 20, borderRadius: 8,backgroundColor: selectedItem === 'map' ? '#3177a7' : 'inherit',color: selectedItem === 'map' ? '#fff' : 'inherit' }} onClick={() => this.handleListItemClick('map')}>
                                <ListItemIcon><MapIcon /></ListItemIcon>
                                <ListItemText primary="Map" />
                            </ListItem>
                            <ListItem button component={Link} to="/archive" style={{ paddingTop: 20, borderRadius: 8,backgroundColor: selectedItem === 'archive' ? '#3177a7' : 'inherit',color: selectedItem === 'archive' ? '#fff' : 'inherit' }} onClick={() => this.handleListItemClick('archive')}>
                                <ListItemIcon><ArchiveIcon /></ListItemIcon>
                                <ListItemText primary="Lưu trữ" />
                            </ListItem>
                            <ListItem button component={Link} to="/calendar" style={{ paddingTop: 20, borderRadius: 8,backgroundColor: selectedItem === 'calendar' ? '#3177a7' : 'inherit',color: selectedItem === 'calendar' ? '#fff' : 'inherit' }} onClick={() => this.handleListItemClick('calendar')}>
                                <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
                                <ListItemText primary="Lịch" />
                            </ListItem>

                        </List>
                    </div>
                </Drawer>
                <div style={{ flexGrow: 1, padding: '0 24px' }}>
                    <AppBar position="static" style={{ marginBottom: 25 }}>
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Vina Tech
                            </Typography>
                            <Button color="inherit" onClick={this.handleClickOpen}>Update</Button>
                        </Toolbar>
                    </AppBar>

                    
                    
                     
                </div>
            </div>
        );
    }
}

export default Home;
