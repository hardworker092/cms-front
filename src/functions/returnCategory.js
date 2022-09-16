import React from 'react';

export const returnCategories = (category) => {
    return (
        category.map((cat) => {
            return (
                <React.Fragment key={cat.id}>
                    <option value={cat.id}>
                        {cat.name}
                    </option>
                    {
                        cat.children.map((sub) => {
                            return (
                                <React.Fragment key={cat.id}>
                                    <option value={sub.id}>
                                        {" "}{sub.name}
                                    </option>
                                    {
                                        sub.children.map((sub2) => {
                                            return (
                                                <React.Fragment key={cat.id}>
                                                    <option value={sub2.id}>
                                                        {"  "}{sub2.name}
                                                    </option>
                                                    {
                                                        sub2.children.map((sub3) => {
                                                            return (
                                                                <React.Fragment key={cat.id}>
                                                                    <option value={sub3.id}>
                                                                        {"   "}{sub3.name}
                                                                    </option>
                                                                    {
                                                                        sub3.children.map((sbu4) => {
                                                                            return (
                                                                                <React.Fragment key={sbu4.id}>
                                                                                    <option value={sbu4.id}>
                                                                                        {"    "}{sbu4.name}
                                                                                    </option>
                                                                                </React.Fragment>
                                                                            )
                                                                        })
                                                                    }
                                                                </React.Fragment>
                                                            )
                                                        })
                                                    }
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </React.Fragment>
                            )
                        })
                    }
                </React.Fragment>
            )
        })
    )
}