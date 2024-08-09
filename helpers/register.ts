// const existingUser = await prisma.user.findFirst({
        //     where: {
        //         email
        //     },
        //     select: {
        //         userId: true
        //     }
        // });
        // if(existingUser) {
        //     return NextResponse.json({success, error: 'User already exists...'}, {status: 400});
        // }
        // const salt = await bcrypt.genSalt(10);
        // const hashedpassword = await bcrypt.hash(password, salt);
        // await prisma.user.create({
        //     data: {
        //         username,
        //         email,
        //         password: hashedpassword,
        //         mobile
        //     },
        //     select: {
        //         userId: true
        //     }
        // });