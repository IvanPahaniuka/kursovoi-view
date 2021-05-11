import {Button, Modal, Row, Col} from "antd";
import * as icons from "@ant-design/icons";
import React, {useState} from "react";
import ICategory from "../types/category";

const categoryButtonStyle = {
    width: '100%',
    textAlign: 'start' as const
};

export interface ICategoriesButtonProps {
    categories?: Array<ICategory>;
    onCategorySelect?: (category: ICategory) => void;
}

export function CategoriesButton({ categories = [], onCategorySelect = () => {} }: ICategoriesButtonProps) {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const onCategoriesClick = () => {
        setIsModalVisible(true);
    };

    const onCategoriesCancelClick = () => {
        setIsModalVisible(false);
    };

    const onCategoryClick = (category: ICategory) => () => {
        setIsModalVisible(false);
        onCategorySelect(category);
    };

    return (
        <div>
            <Button type="primary" icon={<icons.UnorderedListOutlined/>} size='large' onClick={onCategoriesClick}>
                Категории
            </Button>
            <Modal title="Категории" visible={isModalVisible}
                   footer={null} onCancel={onCategoriesCancelClick}>
                <Row gutter={[16, 16]}>
                    {categories.map((category, i) =>
                        <Col span={12} key={i}>
                            <Button style={categoryButtonStyle} size='large'
                                    onClick={onCategoryClick(category)}>
                                {category.name}
                            </Button>
                        </Col>
                    )}
                </Row>
            </Modal>
        </div>
    );
};