import {Button, Checkbox, Modal, Row, Col} from "antd";
import * as icons from "@ant-design/icons";
import React, {useState} from "react";
import ICategory from "../types/category";

const categoryButtonStyle = {
    width: '100%'
};

export interface ICategoriesButtonProps {
    categories?: Array<ICategory>;
    checkedCategories?: Array<ICategory>;
    onCategoryCheckChanged?: (category: ICategory, value: boolean) => void;
}

export function CategoriesButton({ categories = [], checkedCategories = [],
                                     onCategoryCheckChanged = () => {}}: ICategoriesButtonProps) {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const onCategoriesClick = () => {
        setIsModalVisible(true);
    };

    const onCategoriesCancelClick = () => {
        setIsModalVisible(false);
    };

    const onCategoryChange = (category: ICategory) => (e: any) => {
        onCategoryCheckChanged(category, e.target.checked);
    };

    const onClearClick = () => {
        categories?.forEach(
            category => onCategoryCheckChanged(category, false))
    };


    return (
        <div>
            <Button type="primary" icon={<icons.UnorderedListOutlined/>}
                    size='large' onClick={onCategoriesClick}>
                Категории
            </Button>
            <Modal title="Категории" visible={isModalVisible}
                   footer={null} onCancel={onCategoriesCancelClick}>
                <Row gutter={[16, 16]} style={{margin: '0 0 1.5rem'}}>
                    {categories.map((category, i) =>
                        <Col span={12} key={i}>
                            <Checkbox style={categoryButtonStyle}
                                      checked={!!checkedCategories?.find(checkedCategory => checkedCategory.id === category.id)}
                                      onChange={onCategoryChange(category)}>
                                {category.name}
                            </Checkbox>
                        </Col>
                    )}
                </Row>
                <Button type="primary"
                        size='large' onClick={onClearClick}
                        block>
                    Очистить
                </Button>
            </Modal>
        </div>
    );
};