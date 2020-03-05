import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button } from '@buffetjs/core';
import createMatrix from '../../utils/createMatrix';
import getTrad from '../../utils/getTrad';
import ModalSection from '../ModalSection';
import Text from '../Text';
import Container from './Container';
import ButtonWrapper from './ButtonWrapper';
import TextWrapper from './TextWrapper';
import RowItem from './RowItem';

const UploadList = ({
  filesToUpload,
  onClickCancelUpload,
  onClickEditNewFile,
  onGoToAddBrowseFiles,
}) => {
  const matrix = createMatrix(filesToUpload);
  const filesToUploadLength = filesToUpload.length;
  const titleId = `modal.upload-list.sub-header-title.${
    filesToUploadLength > 1 ? 'plural' : 'singular'
  }`;

  // TODO: use <IntlText ... /> instead of FormattedMessage

  return (
    <>
      <ModalSection justifyContent="space-between">
        <TextWrapper>
          <Text fontSize="md" fontWeight="bold">
            <FormattedMessage id={getTrad(titleId)} values={{ number: filesToUploadLength }} />
          </Text>

          <Text fontSize="sm" color="grey">
            <FormattedMessage
              id={getTrad('modal.upload-list.sub-header-subtitle')}
              values={{ number: filesToUploadLength }}
            />
          </Text>
        </TextWrapper>
        <ButtonWrapper>
          <FormattedMessage id={getTrad('modal.upload-list.sub-header.button')}>
            {label => (
              <Button type="button" color="primary" label={label} onClick={onGoToAddBrowseFiles} />
            )}
          </FormattedMessage>
        </ButtonWrapper>
      </ModalSection>

      <ModalSection>
        <Container>
          {matrix.map(({ key, rowContent }) => {
            return (
              <div className="row" key={key}>
                {rowContent.map(data => {
                  return (
                    <RowItem
                      {...data}
                      onClick={onClickCancelUpload}
                      onClickEdit={onClickEditNewFile}
                      key={data.originalIndex}
                    />
                  );
                })}
              </div>
            );
          })}
        </Container>
      </ModalSection>
    </>
  );
};

UploadList.defaultProps = {
  filesToUpload: [],
  onClickCancelUpload: () => {},
  onClickEditNewFile: () => {},
  onGoToAddBrowseFiles: () => {},
};

UploadList.propTypes = {
  filesToUpload: PropTypes.array,
  onClickCancelUpload: PropTypes.func,
  onClickEditNewFile: PropTypes.func,
  onGoToAddBrowseFiles: PropTypes.func,
};

export default UploadList;
