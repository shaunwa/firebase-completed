import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { 
    Button,
    ErrorMessage,
    Heading,
    MaxWidthContentSection,
    Rating,
    TextArea,
    Thumbnail,
    UploadMultipleFilesButton,
} from '../ui';
import { getRestaurant } from '../restaurants';
import { submitReview } from './submitReview';
import { mapAsync, readFile } from '../util';

const Content = styled.div`
    margin: 0 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
`;

const ReviewFieldsTable = styled.table`
    width: 100%;
    padding: 32px;

    td {
        padding: 16px;
    }
`;

const FullWidthButton = styled(Button)`
    width: 100%;
`;

/*
    This component allows users to write and submit reviews for a restaurant.
    This includes uploading photos of their experience at the restaurant that will
    be displayed on their review.
*/
export const WriteAReviewPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [restaurant, setRestaurant] = useState({});
    const [showError, setShowError] = useState(false);
    const [ratingValue, setRatingValue] = useState(0);
    const [commentsValue, setCommentsValue] = useState('');
    const [imageFiles, setImageFiles] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    // This is how we get URL parameters in React
    const { id } = useParams();
    const history = useHistory();

    const { name, imageUrl } = restaurant || {};

    useEffect(() => {
        const loadRestaurant = async () => {
            const results = await getRestaurant(id);
            setRestaurant(results);
            setIsLoading(false);
        }

        loadRestaurant();
    }, [id]);

    // Selecting files can be a tiny bit complex, so I've taken
    // care of that logic for you.
    const handleFileSelect = async files => {
        setImageFiles(files);
        const urls = await mapAsync(files, readFile);
        setImageUrls(urls);
    }

    const onClickSubmitReview = async () => {
        // Check to make sure the user has actually filled out the form
        if (ratingValue > 0 || commentsValue.length > 0) {
            const newReview = {
                rating: ratingValue,
                text: commentsValue,
                imageUrls: [],
            };

            await submitReview(id, newReview);
            history.push('/review/thank-you');
        } else {
            setShowError(true);
        }
    }

    return isLoading ? <Heading>Loading...</Heading> : (
        <MaxWidthContentSection>
            <Content>
                <Heading>Write a Review for {name}</Heading>
                <Thumbnail
                    height="300px"
                    width="600px"
                    url={imageUrl} />
                {showError
                    ? <ErrorMessage
                            style={{ marginTop: '16px' }}
                        >Please fill out all fields</ErrorMessage>
                    : null}
                <ReviewFieldsTable>
                    <tbody>
                        <tr>
                            <td>How would you rate your overall experience?</td>
                            <td>
                                <Rating
                                    id='customer-rating'
                                    name='star-rating'
                                    value={ratingValue}
                                    onChange={(_, newValue) => {
                                        setShowError(false);
                                        setRatingValue(newValue);
                                    }} />
                            </td>
                        </tr>
                        <tr>
                            <td>Comments/Details</td>
                            <td>
                                <TextArea
                                    value={commentsValue}
                                    onChange={e => {
                                        setShowError(false);
                                        setCommentsValue(e.target.value);
                                    }}
                                    cols='40'
                                    rows='5' />
                            </td>
                        </tr>
                        <tr>
                            <td>Have any photos to share?</td>
                            <td>
                                <UploadMultipleFilesButton
                                    onFilesUploaded={handleFileSelect} />
                            </td>
                        </tr>
                    </tbody>
                </ReviewFieldsTable>
                <div style={{ display: 'flex', flexDirection: 'row', padding: '16px' }}>
                    {imageUrls.map(url => (
                        <img
                            key={url}
                            src={url}
                            alt='something'
                            height='100'
                            style={{ display: 'inline', margin: '0 4px' }} />))}
                </div>
                <FullWidthButton
                    onClick={onClickSubmitReview}
                >Submit Review</FullWidthButton>
            </Content>
        </MaxWidthContentSection>
    );
}