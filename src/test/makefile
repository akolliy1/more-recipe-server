test:
	@./node_modules/.bin/mocha

.PHONY: test
server.forEach(model => {
    describe(`${model.modelName} Model`, function (done) {
        var modelData = {
            createdAt: "2018-01-11T00:00:00.000Z",
            updatedAt: "2018-01-12T00:00:00.000Z",
            name: "Sean",
            email: "Destroyed@example.com",
            password: "7325556677",
            // email: "test@gmail.com",
        }

        // ensure "destroy" has a callback
        it(`should create a new ${model.modelName}`, function (done) {
            model.create(modelData).then(function (user) {
                //victim name should be equivalent to the fake submission we are using
                expect(user.name).to.equal("Sean");
                //remove the entry from the database
                model.destroy({
                    where: {
                        id: user.id
                    }
                }).then(function () {
                    done();
                })
            })
        });

        it(`should delete a ${model.modelName} from the database`, function () {
            model.create(modelData).then(function (user) {
                //victim name should be equivalent to the fake submission we are using
                //remove the entry from the database
                model.destroy({
                    where: {
                        id: user.id
                    }
                })

                try {
                    model.findOne({
                        where: {
                            id: user.id
                        }
                    })
                } catch (err) {
                    expect(user.name).to.undefined;
                    if (err) {
                        done()
                    }
                }
                
            })
        })

        it(`should update the ${model.modelName} entry in the database`, function () {
            model.create(modelData).then(function (user) {
                //after user is created, then update a value
                modelData.name = 'sean man'

                model.update(modelData, {
                    where: {
                        id: user.id
                    }
                }).then(function (data) {
                    model.findOne({
                        where: {
                            id: user.id
                        }
                    }).then(function (data) {
                        expect(data.name).to.equal('sean man');
                    }).then(function () {
                        model.destroy({
                            where: {
                                id: user.id
                            }
                        }).then(function () {
                            done()
                        })
                    })
                })
            })
        })
    })
})